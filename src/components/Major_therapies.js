export default function Major_therapies() {
  return (
    <div className="max-w-7xl mx-auto text-[17px] px-10 py-7">
      <div className="prose prose-lg prose-green max-w-none">
        {/* Introduction Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-emerald-800 mb-6">Major Ayurvedic Therapies: Panchakarma</h2>
          <p className="mb-4 text-gray-700">
            The five Panchakarma therapies help in cleansing the body and have a relaxing effect on the body
            and mind. After Purvakarma, following Abhyanga (Therapeutic massage) and Swedana (Sudation),
            suitable Ayurvedic Panchakarma therapies are administered to the patient.
          </p>
        </section>

        {/* Therapies Section */}
        <section className="mb-12">
          <div className="space-y-10">
            {/* Therapy 1 */}
            <div className="bg-amber-50 rounded-xl p-6 shadow-md border-l-4 border-amber-400">
              <h3 className="text-2xl font-bold text-amber-800 mb-4">1. Vamana (Therapeutic Emesis)</h3>
              <p className="text-gray-700">
                In this Panchakarma treatment, vomiting is induced by oral administration of herbal emetics to
                remove the accumulated doshas especially vitiated Kapha dosha from the body. Therapeutic emesis
                is administered in patients suffering from abnormal Kapha accumulated in respiratory tract, sinuses,
                bronchial asthma, psoriasis, chronic allergies, obesity, chronic indigestion, hyperacidity, nasal
                congestion and other skin disorders. Patient is advised to drink decoction of liquorice, etc. as per
                his body constitution and ailment he is suffering from - to the full extent and emesis is induced.
              </p>
            </div>

            {/* Therapy 2 */}
            <div className="bg-amber-50 rounded-xl p-6 shadow-md border-l-4 border-amber-400">
              <h3 className="text-2xl font-bold text-amber-800 mb-4">2. Virechana (Therapeutic Purgation)</h3>
              <p className="text-gray-700">
                This Panchakarma treatment involves the use of oral purgatives to remove the vitiated doshas
                especially Pitta dosha by inducing purgation. It is given to patients suffering from Pitta dosha
                related diseases. It cleanses the gastrointestinal tract thoroughly and voids off the Pitta toxins
                accumulated in the liver, gall bladder and small intestine. Purgation is given with medicines like cow
                milk, black currants, castor oil, etc. It is a safe procedure without side effects. Virechana helps to
                cure chronic fever, diabetes, asthma, skin disorders such as herpes, paraplegia, hemiplegia, joint
                disorders, digestive disorders, constipation, hyperacidity, vitiligo, psoriasis, headaches,
                gynaecological disorders, etc.
              </p>
            </div>

            {/* Therapy 3 */}
            <div className="bg-amber-50 rounded-xl p-6 shadow-md border-l-4 border-amber-400">
              <h3 className="text-2xl font-bold text-amber-800 mb-4">3. Raktamokshana (Blood-letting Therapy)</h3>
              <p className="text-gray-700">
                It is a unique procedure specially performed in disease due to Pitta and Rakta dushti. It is carried out in various ways but the most common techniques used are application of Leeches and blood-letting with syringe. Leeches suck impure blood from our body and are usually helpful in localised area. It reduces pain and swelling in joint pain, localised skin diseases, cracked heels, varicose veins, etc. Blood-letting through syringe is effective in generalised body ailments like hypertension, large area of varicose veins, vitiligo, severe headache, etc.
              </p>
            </div>

            {/* Therapy 4 */}
            <div className="bg-amber-50 rounded-xl p-6 shadow-md border-l-4 border-amber-400">
              <h3 className="text-2xl font-bold text-amber-800 mb-4">4. Nasya (Nasal Medication)</h3>
              <p className="text-gray-700">
                Nasya is one of the Ayurveda Panchakarma therapies which helps in removal of vitiated doshas from the head and sinus by instilling liquid medicines through the nose after massage and fomentation of face and neck. This Panchakarma treatment is beneficial in disorders affecting the head, face and neck. Medicine instilled into nose is known as Nasya. It acts on doshas accumulated in head, neck and face region, especially kapha dosha. It drains out sinus, relieves headache, improves eye sight, memory and promotes hair growth. Nasal allergies, polyps, neck stiffness, frozen shoulder, Bell's palsy can be well treated by Nasya. In cases of hemiplegia and paraplegia it stimulates brain tissues and improves functioning of nervous system.
              </p>
            </div>

            {/* Therapy 5 */}
            <div className="bg-amber-50 rounded-xl p-6 shadow-md border-l-4 border-amber-400">
              <h3 className="text-2xl font-bold text-amber-800 mb-4">5. Basti (Medicated Enemas)</h3>
              <p className="text-gray-700">
                Medicated enema is administered in this treatment through the anal route for expelling vitiated doshas. It is highly beneficial for pacifying Vata dosha. This treatment involves the introduction of herbal oils, decoctions, mixtures, etc. into the rectum with the patient lying in left lateral position. Basti is considered to be the most effective treatment in Ayurveda as it not only prime cure for Vata disorders but also cleanses toxins created by Pitta and Kapha through rectum. Medicated oil, ghee or decoction is introduced through anus into the colon. Basti is an effective therapy in osteoporosis, gas trouble, constipation, backache, hemiplegia, paraplegia, sciatica, cervical spondylosis, chronic fever, arthritis, muscle spasm, acidity, digestive disorders, joint pain, slip disc, sexual disorders, etc. and other ailments caused due to imbalance of vata dosha. The large intestine and bones are the main seat of Vata, so Basti is administered through rectum which removes toxins and also nourishes the membrane of colon and controls vata diseases efficiently.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-green-50 rounded-xl p-6 shadow-md border-l-4 border-green-400">
          <h3 className="text-2xl font-bold text-green-800 mb-4">Benefits of Major Ayurvedic Therapies</h3>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li>Deep detoxification at the cellular level</li>
            <li>Restores natural metabolic balance</li>
            <li>Eliminates deep-rooted chronic ailments</li>
            <li>Rejuvenates all body systems and organs</li>
            <li>Strengthens immunity and disease resistance</li>
            <li>Promotes longevity and healthy aging</li>
            <li>Enhances mental clarity and emotional balance</li>
          </ul>
        </section>
      </div>
    </div>
  );
}