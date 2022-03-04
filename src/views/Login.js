import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getAuth,
  EmailAuthProvider,
  linkWithCredential,
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

export default function LoginUser({ profile }) {
  const auth = getAuth();
  const db = getFirestore();

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
          return signInWithEmailAndPassword(auth, email, password)
            .then(async (usercred) => {
              const user = usercred.user;
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

  return !profile?.displayName ? (
    <div className="d-flex justify-content-md-center align-items-center vh-100">
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

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Login</h5>
            <div>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
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
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
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
              </form>
            </div>
            <Link to="/login" className="card-link">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-md-center align-items-center vh-100">
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">Glorious!!!</h4>
      </div>
    </div>
  );
}
