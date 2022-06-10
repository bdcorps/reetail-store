import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button, Text } from "@chakra-ui/react";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <header>
      <div>
        {loading ? (
          "Loading..."
        ) : (
          <>
            {!session && (
              <>
                <Text>You are not signed in</Text>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                >
                  Sign in
                </Button>
              </>
            )}
            {session?.user && (
              <>
                <p>{session.user.email ?? session.user.name}</p>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign out
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
}
