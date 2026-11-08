import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, ArrowLeft, CheckCircle2, ChevronDown, Loader2, Send } from 'lucide-react';
import { profile, type ContactConfig } from '../config/profile';
import { ease, fadeUp } from '../lib/motion';
import { WhatsappIcon } from './Icons';

// -----------------------------------------------------------------------------
//  Validação (mensagens vêm do profile.ts)
// -----------------------------------------------------------------------------

const onlyDigits = (value: string) => value.replace(/\D/g, '');

function createSchema(config: ContactConfig) {
  const v = config.validation;
  return z.object({
    name: z.string().trim().min(1, v.nameRequired),
    email: z.string().trim().min(1, v.emailRequired).email(v.emailInvalid),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || [10, 11].includes(onlyDigits(val).length), v.phoneInvalid),
    subject: z.string().min(1, v.subjectRequired),
    message: z
      .string()
      .trim()
      .min(1, v.messageRequired)
      .min(config.messageMinLength, v.messageMin),
    consent: z.boolean().refine((val) => val, v.consentRequired),
    _gotcha: z.string().optional(),
  });
}

type FormValues = z.infer<ReturnType<typeof createSchema>>;

/** Máscara (81) 99999-9999 — também aceita fixo (81) 9999-9999 */
function maskPhone(value: string) {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length === 0) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const defaultValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false,
  _gotcha: '',
};

type Status = 'idle' | 'sending' | 'success' | 'error';

// -----------------------------------------------------------------------------
//  Auxiliares
// -----------------------------------------------------------------------------

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          className="field-error"
          style={{ overflow: 'hidden' }}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease }}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function Field(props: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  const { id, label, hint, error, children } = props;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {hint && <span className="hint">{hint}</span>}
      </label>
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

// -----------------------------------------------------------------------------
//  Formulário
// -----------------------------------------------------------------------------

interface ContactFormProps {
  onBack: () => void;
  /** Move o foco para o título ao abrir (acessibilidade) */
  focusOnMount?: boolean;
}

export default function ContactForm({ onBack, focusOnMount }: ContactFormProps) {
  const contact = profile.contact;
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (focusOnMount) titleRef.current?.focus({ preventScroll: true });
  }, [focusOnMount]);
  const { fields } = contact;
  const schema = useMemo(() => createSchema(contact), [contact]);
  const [status, setStatus] = useState<Status>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onTouched',
  });

  const onSubmit = async (data: FormValues) => {
    setStatus('sending');
    try {
      const response = await fetch(contact.endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: data.name,
          email: data.email,
          telefone: data.phone || '—',
          assunto: data.subject,
          mensagem: data.message,
          consentimento_lgpd: 'Sim',
          _replyto: data.email,
          _subject: `${contact.emailSubjectPrefix} ${data.subject}`,
          _gotcha: data._gotcha,
        }),
      });
      if (!response.ok) throw new Error(`Formspree respondeu ${response.status}`);
      setStatus('success');
      reset(defaultValues);
    } catch {
      setStatus('error');
    }
  };

  const sending = status === 'sending';
  const phoneField = register('phone');

  /** Props de acessibilidade comuns a cada campo */
  const a11y = (name: keyof FormValues) => ({
    id: `contact-${name}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
  });

  return (
    <section aria-labelledby="contact-title">
      <motion.div variants={fadeUp}>
        <button type="button" className="back-link" onClick={onBack}>
          <ArrowLeft aria-hidden="true" strokeWidth={1.8} />
          {profile.backLabel}
        </button>
        <h2 id="contact-title" ref={titleRef} tabIndex={-1} className="section-title">
          {contact.title}
        </h2>
        <p className="contact-sub">{contact.subtitle}</p>
      </motion.div>

      <motion.form variants={fadeUp} noValidate onSubmit={handleSubmit(onSubmit)} className="form-card">
        <Field id="contact-name" label={fields.name.label} error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            placeholder={fields.name.placeholder}
            className="input"
            {...a11y('name')}
            {...register('name')}
          />
        </Field>

        <Field id="contact-email" label={fields.email.label} error={errors.email?.message}>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={fields.email.placeholder}
            className="input"
            {...a11y('email')}
            {...register('email')}
          />
        </Field>

        <Field
          id="contact-phone"
          label={fields.phone.label}
          hint={fields.phone.hint}
          error={errors.phone?.message}
        >
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder={fields.phone.placeholder}
            className="input"
            {...a11y('phone')}
            {...phoneField}
            onChange={(e) => {
              e.target.value = maskPhone(e.target.value);
              phoneField.onChange(e);
            }}
          />
        </Field>

        <Field id="contact-subject" label={fields.subject.label} error={errors.subject?.message}>
          <div className="select-wrap">
            <select className="input" {...a11y('subject')} {...register('subject')}>
              <option value="" disabled>
                {fields.subject.placeholder}
              </option>
              {contact.subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" strokeWidth={1.8} />
          </div>
        </Field>

        <Field id="contact-message" label={fields.message.label} error={errors.message?.message}>
          <textarea
            rows={5}
            placeholder={fields.message.placeholder}
            className="input"
            {...a11y('message')}
            {...register('message')}
          />
        </Field>

        {/* Honeypot anti-spam: invisível para pessoas, preenchido por robôs */}
        <div aria-hidden="true" className="honeypot">
          <label htmlFor="contact-gotcha">{fields.honeypot.label}</label>
          <input id="contact-gotcha" type="text" tabIndex={-1} autoComplete="off" {...register('_gotcha')} />
        </div>

        <div>
          <label htmlFor="contact-consent" className="consent">
            <input type="checkbox" {...a11y('consent')} {...register('consent')} />
            <span>{fields.consent.label}</span>
          </label>
          <FieldError id="contact-consent-error" message={errors.consent?.message} />
        </div>

        <button type="submit" disabled={sending} aria-busy={sending} className="btn btn--primary">
          <span className="icon" aria-hidden="true">
            {sending ? <Loader2 className="spin" /> : <Send strokeWidth={1.7} />}
          </span>
          <span className="label">{sending ? contact.sendingLabel : contact.submitLabel}</span>
        </button>

        {/* Mensagens de status anunciadas pelo leitor de tela */}
        <div aria-live="polite">
          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.p
                key="success"
                role="status"
                className="form-status"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <CheckCircle2 aria-hidden="true" />
                {contact.successMessage}
              </motion.p>
            )}

            {status === 'error' && (
              <motion.div
                key="error"
                role="alert"
                className="form-status form-status--error"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <span style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <AlertCircle aria-hidden="true" style={{ marginTop: 2 }} />
                  {contact.errorMessage}
                </span>
                <a
                  href={profile.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${contact.errorWhatsappLabel} ${profile.a11y.newTab}`}
                  className="pill-link"
                >
                  <WhatsappIcon />
                  {contact.errorWhatsappLabel}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.form>

      <motion.p variants={fadeUp} className="form-alt">
        {contact.directContactText} <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </motion.p>
    </section>
  );
}
