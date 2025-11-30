import Link from 'next/link'

function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-base">Sign up</legend>

        <label className="label">Name</label>
        <input type="text" className="input" placeholder="Name" />

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />

        <Link href="/auth/login" className="link text-center mt-2 text-primary">Already have an account? click here</Link>

        <button className="btn btn-primary mt-4">Sign up</button>
      </fieldset>
    </div>
  )
}

export default SignUp
