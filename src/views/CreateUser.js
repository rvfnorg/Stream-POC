import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getAuth,
  EmailAuthProvider,
  linkWithCredential,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import stream from "getstream";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

export default function CreateUser({ streamConfig }) {
  const auth = getAuth();
  const db = getFirestore();
  const profile = useSelector((s) => s.profile);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubmit = (e) => {
    setLoading(true);

    try {
      const credential = EmailAuthProvider.credential(email, password);

      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          return linkWithCredential(auth.currentUser, credential)
            .then(async (usercred) => {
              const user = usercred.user;
              await updateDoc(doc(db, "profiles", user.uid), {
                displayName,
                roles: ["user"],
              });
              const client = stream.connect(
                streamConfig.apiKey,
                profile.streamToken,
                streamConfig.appId
              );

              await client.user(user.uid).create({
                name: displayName,
              });
              setError(null);
              setLoading(false);
              setSuccess("Anonymous account successfully upgraded", user);
            })
            .catch((error) => {
              setSuccess(null);
              setLoading(false);
              setError("Error upgrading anonymous account", error);
            });
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }

    e.preventDefault();
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {!profile?.displayName ? (
                <div>
                  {success && (
                    <div className="alert alert-success" role="alert">
                      {success}
                    </div>
                  )}
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  <div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else. ;-)
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Display Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="alert alert-success" role="alert">
                  <h4 className="alert-heading">Glorious!!!</h4>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {loading ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  &nbsp; Loading...
                </button>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Create User
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
