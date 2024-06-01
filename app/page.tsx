import { auth } from "@/auth";
import AuthButton from "@/components/AuthButton";

export default async function Home() {
    const session = await auth();

    return (
        <main>
            <AuthButton />
            {JSON.stringify(session)}
        </main>
    );
}
