"use client";

import {
  Eye,
  Footprints,
  Scissors,
  SearchIcon,
  Sparkles,
  User,
  Waves,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PageSectionScroller } from "./ui/page";

const services = [
  { label: "Cabelo", value: "cabelo", icon: Scissors },
  { label: "Barba", value: "barba", icon: User },
  { label: "Acabamento", value: "acabamento", icon: Sparkles },
  { label: "Sobrancelha", value: "sobrancelha", icon: Eye },
  { label: "Pézinho", value: "pézinho", icon: Footprints },
  { label: "Progressiva", value: "progressiva", icon: Waves },
];

const QuickSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSearch = searchParams.get("search");
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchValue.trim()) return;
    router.push(
      `/barbershops?search=${encodeURIComponent(searchValue.trim())}`,
    );
  };

  return (
    <>
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <Input
          className="border-border rounded-full"
          placeholder="Pesquisar"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button type="submit" className="h-10 w-10 rounded-full">
          <SearchIcon />
        </Button>
      </form>

      <PageSectionScroller>
        {services.map(({ label, value, icon: Icon }) => {
          const isActive = activeSearch === value;

          return (
            <Link
              key={value}
              href={`/barbershops?search=${value}`}
              className={`border-border flex shrink-0 items-center justify-center gap-3 rounded-3xl border px-4 py-2 transition-colors ${
                isActive ? "bg-muted" : "bg-card-background hover:bg-muted/60"
              } `}
            >
              <Icon className="size-4" />
              <span className="text-card-foreground text-sm font-medium">
                {label}
              </span>
            </Link>
          );
        })}
      </PageSectionScroller>
    </>
  );
};

export default QuickSearch;
