"use client";
// import { useRouter, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { isError, error, isSuccess } = api.auth.authCallback.useQuery();

  if (isSuccess) {
    // If it is successful the user will be synced to the db
    // and user will be redirected to the origin or the dashboard
    router.push(origin ? `/${origin}` : "/dashboard");
  }

  if (isError) {
    if (error.data?.code === "UNAUTHORIZED") {
      router.push("/sign-in");
    }
  }

  return (
    <div className="mt-24 flex  w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="text-xl font-semibold">Setting up your account...</h3>
        <p>You will be redirected automatically</p>
      </div>
    </div>
  );
}