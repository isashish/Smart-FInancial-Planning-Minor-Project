import '../Styles/SignIn.css';

export default function SignIn() {
    return (
        <div className="signin-container">
            <form className="signin-form">
                <h2>Welcome Back to AI-Fintech</h2>
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}