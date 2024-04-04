import React from "react";

function Privacy() {
  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '18px',
    lineHeight: '1.6',
  };

  const h1Style = {
    textAlign: 'center',
    fontSize: '35px',
    marginTop: '20px',
  };

  const h2Style = {
    textAlign: 'center',
    fontSize: '24px',
    marginTop: '20px',
  };

  const pStyle = {
    textAlign: 'left',
    margin: '10px auto',
    maxWidth: '800px',
  };

  const ulStyle = {
    listStyleType: 'none',
    textAlign: 'center',
    paddingLeft: 0,
  };

  const liStyle = {
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={h1Style}>Privacy Policy - Jasmin Privacy Statement</h1>
      <p style={pStyle}>
        Jasmin respects the privacy of visitors and their information. This
        Privacy Statement explains how we, at Jasmin (“Jasmin” or “we”) collect,
        use, share, store, and protect the information that is collected when
        users (patients and/or licensed psychologists) visit Jasmin and use
        Jasmin services. These services include: :
      </p>

      <ul style={ulStyle}>
        <li style={liStyle}>
          Choosing your desired therapy service as a patient
        </li>
        <li style={liStyle}>
          Specifying your specialties as a licensed psychologist
        </li>
        <li style={liStyle}>Patient/Therapist Matching</li>
        <li style={liStyle}>Appointment Scheduling</li>
        <li style={liStyle}>Online therapy sessions via Zoom</li>
      </ul>

      <p style={pStyle}>
        For the purposes of this Privacy Statement, these services will be
        referred to as the Features. This privacy policy also discloses the use
        of artificial intelligence on Jasmin for the purpose of an integrated
        ChatBot that patients can utilize. This privacy statement does not apply
        to any information that is collected through other sources outside of
        what users submit to Jasmin, and does not apply to third-party websites
        that Jasmin may be linked to.
      </p>

      <h2 style={h2Style}>Definition of Personal Information</h2>

      <p style={pStyle}>
        Under Jasmin, the definition of “personal information” is any
        information that may be used to identify an individual. This includes
        your name, location, age, email address, and other similar information.
      </p>

      <h2 style={h2Style}>Collection of Personal Information</h2>
      <p style={pStyle}>
        In order to access the Features of Jasmin, all users (patients and
        therapists) must complete a registration form. The registration form
        requires the submission of the following information, for both patients
        and therapists:
      </p>
      <ul style={ulStyle}>
        <li style={liStyle}>First and Last Name</li>
        <li style={liStyle}>Email</li>
        <li style={liStyle}>Age</li>
        <li style={liStyle}>Gender</li>
        <li style={liStyle}>Location</li>
        <li style={liStyle}>Occupation</li>
      </ul>

      <p style={pStyle}>
        As a patient you can list your personal concerns, which pertain to your
        medical history. As a licensed psychologist, you can select your
        specific specialties which pertain to your profession and their
        professional history. By registering, you agree to the collection and
        use of the information listed above for the ability to access Jasmin’s
        Features. You may browse through Jasmin without registering and
        disclosing any information, however, you cannot access the main services
        without a registered profile.
      </p>

      <h2 style={h2Style}>Use of Personal Information</h2>
      <p style={pStyle}>
        User information that is collected is used by Jasmin to, among other
        things, process and manage patient and therapist registrations, track
        usage policy and statistics, and operate and improve core Features such
        as, but not limited to:
      </p>
      <ul style={ulStyle}>
        <li style={liStyle}>Patient/Therapist Matching</li>
        <li style={liStyle}>Appointment scheduling</li>
        <li style={liStyle}>Therapist Specialty Selection</li>
        <li style={liStyle}>AI ChatBot Integration</li>
      </ul>
      <p style={pStyle}>
        The user information that is collected by Jasmin also provides ease of
        access for you to explore the services offered by Jasmin, whether as a
        patient seeking professional help or licensed psychologists and
        therapists seeking to provide assistance to those in need of help. We
        also use your information to send an email confirming your registration
        and to inform you of significant changes made to this Privacy Statement.
      </p>

      <h2 style={h2Style}>Disclosure of Personal Information</h2>
      <p style={pStyle}>
        Your personal information is kept confidential within Jasmin, as per
        compliance with doctor/patient confidentiality regulations. We do not
        share your personal information with other third party sites, but be
        aware that we provide Zoom integration services for online consultations
        between patients and licensed psychologists. This may require you to
        provide your sign in credentials for Zoom or require you to create an
        account to access Zoom features in order to participate in meetings as a
        patient or licensed psychologist. Jasmin will not share, post, or sell
        your information to parties outside of Jasmin without your consent.
      </p>

      <h2 style={h2Style}>Access to Personal Information</h2>
      <p style={pStyle}>
        To update, change, or delete the information you have provided to
        Jasmin, please email <a href="mailto:xxx@xxx.xxx">xxx@xxx.xxx</a>.
      </p>

      <h2 style={h2Style}>Security</h2>
      <p style={pStyle}>
        Jasmin has implemented the necessary cybersecurity measures and
        practices to protect your personal information provided to us. However,
        we cannot guarantee the absolute security of the information as no
        method of storing and transmitting personal data electronically is ever
        completely secure. We cannot guarantee that information will never be
        accessed, used, or released in a way that is inconsistent with this
        Privacy Statement.
      </p>

      <h2 style={h2Style}>Children’s Privacy</h2>
      <p style={pStyle}>
        Jasmin provides child therapy services to patients under the legal adult
        age of 18 years old. Personal information collected from the children is
        done so with the consent of a parent or legal guardian of the child
        receiving the care.
      </p>

      <h2 style={h2Style}>Artificial Intelligence</h2>
      <p style={pStyle}>
        Jasmin implements the use of kAI, an AI chatbot to provide additional
        assistance to patients, whether to inquire more about their personal
        concerns or about additional services offered by Jasmin aside from the
        core Features. The AI chatbot will only use the information provided by
        the patient or user communicating with it and the information will be
        securely stored within Jasmin for statistical and further model training
        purposes. The AI is used specifically for Jasmin and is not linked to
        any third party outside of Jasmin.
      </p>

      <h2 style={h2Style}>Changes to this Privacy Statement</h2>
      <p style={pStyle}>
        Jasmin may update this Privacy Statement in the future. We will notify
        you of any significant changes via the email you provided to us upon
        registration or by placing a notice on the Jasmin site.
      </p>

      <h2 style={h2Style}>Contact Us</h2>
      <p style={pStyle}>
        If you have any questions or concerns regarding this Privacy Statement,
        please contact us at this address:{" "}
        <a href="mailto:xxx@xxx.xxx">xxx@xxx.xxx</a>.
      </p>
    </div>
  );
}

export default Privacy;
