import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginWithSocial from "./LoginWithSocial";
import ReCAPTCHA from "react-google-recaptcha";
import { userLogin } from "../../../../store/slices/auth/actions.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ActionLoader from "@/components/loader/ActionLoader";

const FormContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, userInfo, userToken, error, success, message } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    if (email && password) {
      e.preventDefault();
      dispatch(userLogin({ email: email, password: password }));
    }
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  // useEffect(() => {
  //   if (userToken) {
  //     // navigate("/candidates-dashboard/my-profile");
  //     window.location.href = "/candidates-dashboard/my-profile";
  //   }
  // }, [userToken]);
  return (
    <div className="form-inner">
      <h3>Login to Sentry Spot</h3>

      {/* <!--Login Form--> */}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* name */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* password */}
        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input type="checkbox" name="remember-me" id="remember" />
              <label htmlFor="remember" className="remember">
                <span className="custom-checkbox"></span> Remember me
              </label>
            </div>
            <a href="#" className="pwd">
              Forgot password?
            </a>
          </div>
        </div>
        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input type="checkbox" name="service-me" id="service" required />
              <label htmlFor="service" className="service">
                <span className="custom-checkbox">
                  By using our Services, you agree to our terms of use
                </span>
              </label>
            </div>
          </div>
        </div>
        {/* forgot password */}
        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={onChange}
        />

        <div className="form-group mt-2">
          <button
            type="submit"
            name="log-in"
            className="theme-btn btn-style-one"
            onClick={submitHandler}
            disabled={loading}
          >
            {loading ? <ActionLoader /> : "Log In"}
          </button>
        </div>
        {/* login */}
      </form>
      {/* End form */}

      <div className="bottom-box">
        <div className="text">
          Don&apos;t have an account?{" "}
          <Link
            to="#"
            className="call-modal signup"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            Signup
          </Link>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <LoginWithSocial />
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default FormContent;
