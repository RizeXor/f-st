import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/navbar";

const Text = () => {
  const [content, setContent] = useState("");
  const [shares, setShares] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setSubmitting(true);

      const response = await fetch("/api/text", {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setShares([json, ...shares]);
      setSubmitting(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Head>
        <title>F-ST | Text</title>
      </Head>

      <Navbar />

      <main className="container mt-3">
        <div className="row g-3 px-5">
          <div className="col-7">
            <div className="d-flex flex-column justify-content-center h-100">
              <h2 className="fw-bold">F-ST Text</h2>
              <p className="lead">
                A trusted way to share information directly with anyone.
              </p>
            </div>
          </div>
          <div className="col-5">
            <form className="card" onSubmit={(e) => handleSubmit(e)}>
              <div className="card-header">Create a link</div>
              <div className="card-body">
                <textarea
                  className="form-control"
                  id="content"
                  onChange={handleChange}
                  value={content}
                  placeholder="0x957a9951cc061a4cc9c5db42b891614400b8ada7"
                  spellCheck={false}
                ></textarea>
                <div className="d-grid mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? "Generating..." : "Create"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      <section className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-12">
            <h2>Shares</h2>
            <hr />
            <div className="row g-3">
              {shares.map((s) => (
                <div className="col-12" key={s.long_url}>
                  <div
                    className="alert alert-dark d-flex flex-column flex-lg-row justify-content-between align-items-center"
                    role="alert"
                  >
                    <a href={s.long_url}>{s.long_url}</a>
                    <button className="btn btn-secondary">Copy</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Text;
