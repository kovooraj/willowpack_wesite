import type { Metadata } from "next";
import { site } from "@/lib/site";
import QuoteBox from "@/components/QuoteBox";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a packaging project with Willowpack. Answer a few quick questions and a specialist will reply within one business day.",
};

export default function Contact() {
  return (
    <section className="contact">
      <div className="wrap contact__grid">
        <div className="contact__aside">
          <span className="eyebrow">Contact</span>
          <h1 className="display display--lg" style={{ margin: "18px 0 24px" }}>
            Let's talk packaging.
          </h1>
          <p>
            There's no long form to fill in. Tell our quote assistant what you're packaging and you'll see price breaks
            in seconds. A Willowpack packaging specialist then finalizes the quote with you.
          </p>
          <dl>
            <div>
              <dt className="eyebrow">Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            {site.phone && (
              <div>
                <dt className="eyebrow">Phone</dt>
                <dd>
                  <a href={`tel:${site.phone}`}>{site.phone}</a>
                </dd>
              </div>
            )}
            <div>
              <dt className="eyebrow">Facility</dt>
              <dd>{site.location}</dd>
            </div>
          </dl>
        </div>
        <div>
          <QuoteBox campaign="website-contact" />
        </div>
      </div>
    </section>
  );
}
