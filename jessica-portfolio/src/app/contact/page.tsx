import styles from "./page.module.css";

type Props = {
  searchParams?: { success?: string };
};

export default function ContactPage({ searchParams }: Props) {
  const success = searchParams?.success === "true";

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={styles.intro}>
          <h1 className={styles.title}>Discutons ensemble</h1>

          <p className={styles.text}>
            Une idée, un projet ou simplement une envie d’échanger ?
            <br />
            Laisse-moi un message, je te répondrai dès que possible.
          </p>

          <p className={styles.text}>
            Et si tu préfères, nous pouvons aussi échanger directement par e-mail :
            <br />
            <a
              href="mailto:jessicarozycka@yahoo.fr"
              className={styles.email}
            >
              jessicarozycka@yahoo.fr
            </a>
          </p>

          <p className={styles.text}>Réponse généralement sous 24h.</p>
        </div>

        {/* TODO: brancher Formspree ici quand Jessica aura créé le formulaire */}
        {/* action="https://formspree.io/f/XXXXXXX" method="POST" */}

        <form className={styles.form}>
          <input
            type="hidden"
            name="_subject"
            value="Nouveau message depuis le portfolio Jessica"
          />

          <input type="hidden" name="_captcha" value="false" />

          <input
            type="text"
            name="_gotcha"
            className={styles.honeypot}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Nom complet *</label>

            <div className={styles.nameRow}>
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                className={styles.input}
                required
              />

              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Email *</label>

            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Message *</label>

            <textarea
              name="message"
              placeholder="Votre message..."
              className={`${styles.input} ${styles.textarea}`}
              required
            />
          </div>

          <button type="button" className={styles.button}>
            SUBMIT
          </button>

          {success && (
            <p className={styles.success}>
              Merci pour votre message. Je vous répondrai rapidement.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}