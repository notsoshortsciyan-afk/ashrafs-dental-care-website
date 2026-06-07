import { Button } from "@/components/ui/button";

export function PhasePlaceholder() {
  return (
    <section id="home" className="bg-background">
      <div className="container flex min-h-[calc(100vh-5rem)] items-center py-16">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Phase 1 setup
          </p>
          <h1 className="text-5xl font-bold leading-tight text-foreground sm:text-6xl">
            Ashrafs Dental Clinic
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            The responsive layout shell is ready. Hero, services, stories, and contact
            sections will replace this placeholder in the next phases.
          </p>
          <Button asChild className="mt-8">
            <a href="#contact">Start with an appointment</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
