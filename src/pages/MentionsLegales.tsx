export default function MentionsLegales() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="mb-10 font-serif text-4xl sm:text-5xl">Mentions légales</h1>

      <div className="grid gap-8 leading-relaxed">
        <div>
          <h2 className="mb-2 font-serif text-2xl">Éditeur du site</h2>
          <p>
            BILONG Pulcherie
            <br />
            Entrepreneur Individuel
            <br />
            75000 Paris, France
            <br />
            SIRET : [numéro]
            <br />
            Email : contact@pulcherieb.com
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-serif text-2xl">Directrice de la publication</h2>
          <p>BILONG Pulcherie</p>
        </div>

        <div>
          <h2 className="mb-2 font-serif text-2xl">Hébergement</h2>
          <p>
            Netlify, Inc. — 512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis.
            <br />
            Les données (photos, avis, demandes de devis) sont stockées chez Supabase.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-serif text-2xl">Données personnelles</h2>
          <p>
            Les informations saisies dans le formulaire de devis (nom, email,
            téléphone, détails de l’événement) sont utilisées uniquement pour répondre
            à votre demande. Elles ne sont ni revendues ni transmises à des tiers.
            Vous pouvez demander leur consultation, leur modification ou leur
            suppression à tout moment en écrivant à contact@pulcherieb.com.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-serif text-2xl">Propriété intellectuelle</h2>
          <p>
            Les photographies, textes et créations présentés sur ce site sont
            la propriété de BILONG. Toute reproduction sans autorisation écrite est interdite.
          </p>
        </div>
      </div>
    </section>
  )
}