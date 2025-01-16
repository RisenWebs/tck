import sendGrid from '@sendgrid/mail';
import sanitizeHtml from 'sanitize-html';

function sanitize(string: string) {
  return sanitizeHtml(string);
}

export function initEmail() {
  sendGrid.setApiKey(process.env.SENDGRID_API_KEY as string);
}

export async function sendEmail({
  to,
  subject,
  html
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.SENDGRID_API_KEY) {
    // eslint-disable-next-line no-console
    console.log('Missing environment variables. Not sending email...');
    return;
  }

  initEmail();

  await sendGrid.send({
    to,
    from: 'contact@tck.gg',
    subject,
    html: sanitize(html)
  });
}
