import MemberInvitation from "@/lib/emails/MemberInvitation";

export function memberInvitation() {
  return (
    <MemberInvitation
      name="Björn B."
      link={'http://localhost:3000/konstnar/konto/inbjudan'}
    />
  );
}
