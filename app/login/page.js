export default function LoginPage() {
  if (typeof window !== "undefined") {
    window.location.href = "/auth"
  }
  return null
}
