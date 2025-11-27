export default async function Privacy() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-start p-4 mt-10 mb-20 max-w-4xl mx-auto gap-8">
        <header>
          <h1 className="text-3xl">Privacy Policy for AI Calendar</h1>
          <p>
            <strong>Effective Date:</strong> November 27, 2025
          </p>
          <p>
            <strong>Website:</strong>{" "}
            https://ai-calendar.jmbsoftwaresolutions.dev/
          </p>
        </header>

        <section aria-labelledby="introduction">
          <h2 className="text-2xl" id="introduction">
            Introduction
          </h2>
          <p>
            AI Calendar respects your privacy. This Privacy Policy explains how
            we collect, use, and protect information when you use our
            application, particularly in connection with Google OAuth.
          </p>
        </section>

        <section aria-labelledby="info-we-collect">
          <h2 className="text-2xl" id="info-we-collect">
            Information we collect
          </h2>
          <p>
            When you sign in with Google OAuth, we request the following scopes
            and use them only for the purposes described:
          </p>
          <ul>
            <li>
              <strong>openid, email, profile:</strong> Authenticate your
              identity and display your basic account information (name, email
              address, profile picture).
            </li>
            <li>
              <strong>https://www.googleapis.com/auth/calendar.events:</strong>{" "}
              Create calendar events on your behalf.
            </li>
            <li>
              <strong>
                https://www.googleapis.com/auth/calendar.readonly:
              </strong>{" "}
              Retrieve the list of calendars you own, so you can select which
              calendar to use. We do not read or store your event details using
              this scope.
            </li>
          </ul>
          <p>
            We do not collect passwords or sensitive personal information beyond
            what is required to provide the service.
          </p>
        </section>

        <section aria-labelledby="how-we-use">
          <h2 className="text-2xl" id="how-we-use">
            How we use information
          </h2>
          <ul>
            <li>
              <strong>Authentication:</strong> Sign you in securely and
              associate your session with your Google account.
            </li>
            <li>
              <strong>Event creation:</strong> Create calendar events on your
              selected Google Calendar at your request.
            </li>
            <li>
              <strong>Calendar selection:</strong> Display your list of
              calendars so you can choose where events are created.
            </li>
          </ul>
          <p>
            We do not use your information for advertising, marketing, or
            unrelated purposes.
          </p>
        </section>

        <section aria-labelledby="storage-security">
          <h2 className="text-2xl" id="storage-security">
            Data storage and security
          </h2>
          <ul>
            <li>
              <strong>Minimal access:</strong> Your calendar data is accessed
              only as needed to provide event creation and calendar selection.
            </li>
            <li>
              <strong>No persistent event storage:</strong> We do not
              permanently store your calendar event content on our servers.
            </li>
            <li>
              <strong>Protection:</strong> We implement industry-standard
              security measures to protect against unauthorized access.
            </li>
          </ul>
        </section>

        <section aria-labelledby="sharing">
          <h2 className="text-2xl" id="sharing">
            Sharing of information
          </h2>
          <p>
            We do not share your personal information with third parties except:
          </p>
          <ul>
            <li>
              <strong>Legal compliance:</strong> When required by law.
            </li>
            <li>
              <strong>Service integrity:</strong> To protect the security and
              integrity of our application.
            </li>
          </ul>
        </section>

        <section aria-labelledby="choices">
          <h2 className="text-2xl" id="choices">
            Your choices
          </h2>
          <ul>
            <li>
              <strong>Revoke access:</strong> You may revoke AI Calendar’s
              access at any time via your Google Account permissions.
            </li>
            <li>
              <strong>After revocation:</strong> We will no longer have access
              to your Google account data or calendars.
            </li>
          </ul>
        </section>

        <section aria-labelledby="contact">
          <h2 className="text-2xl" id="contact">
            Contact us
          </h2>
          <p>
            If you have questions about this Privacy Policy, please contact:
          </p>
          <p>
            <strong>JMB Software Solutions, LLC</strong>
            <br />
            Email:{" "}
            <a href="mailto:jmbsoftwaresolutions@outlook.com">
              jmbsoftwaresolutions@outlook.com
            </a>
          </p>
        </section>
      </main>
    </>
  );
}
