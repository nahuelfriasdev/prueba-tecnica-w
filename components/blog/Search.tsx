"use client";

import { SearchIcon, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useRef, ChangeEvent } from "react";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [value, setValue] = useState(searchParams.get("q")?.toString() || "");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setValue(term);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (term) {
        params.set("q", term);
      } else {
        params.delete("q");
      }

      startTransition(() => {
        router.push(`/?${params.toString()}`, { scroll: false });
      });
    }, 400); 
  };

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <Input
        value={value}
        onChange={handleSearch}
        placeholder="Título, texto, autor..."
        className="w-64 pl-10 focus-visible:ring-1"
      />
    </div>
  );
}