import {
  siAngular,
  siCss,
  siDocker,
  siDotnet,
  siGit,
  siGithubactions,
  siGooglesearchconsole,
  siHtml5,
  siI18next,
  siJavascript,
  siJsonwebtokens,
  siNestjs,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siPostgresql,
  siPostman,
  siPrisma,
  siPython,
  siReact,
  siReacthookform,
  siReactivex,
  siReactquery,
  siRedis,
  siSharp,
  siStripe,
  siTailwindcss,
  siTypescript,
  siVite,
  siVitest,
  siWhatsapp,
  type SimpleIcon,
} from "simple-icons";
import {
  Blocks,
  Bot,
  Braces,
  Code2,
  Database,
  FileCheck2,
  Gauge,
  GitPullRequest,
  KeyRound,
  Layers,
  Link2,
  MonitorSmartphone,
  Radio,
  Repeat,
  Route,
  ShieldCheck,
  Sparkles,
  TestTube2,
  Timer,
  Users,
  Webhook,
  Workflow,
  type LucideIcon,
} from "lucide-react";

type IconSource = { brand: SimpleIcon } | { glyph: LucideIcon };

// First matching rule wins, so more specific names come before broader ones.
const rules: [RegExp, IconSource][] = [
  [/asp\.net core identity|jwt/i, { brand: siJsonwebtokens }],
  [/\.net|asp\.net|entity framework|ef core|linq/i, { brand: siDotnet }],
  [/^c#$/i, { brand: siSharp }],
  [/typescript/i, { brand: siTypescript }],
  [/javascript/i, { brand: siJavascript }],
  [/python/i, { brand: siPython }],
  [/html/i, { brand: siHtml5 }],
  [/^css|tailwind/i, { brand: siTailwindcss }],
  [/nestjs/i, { brand: siNestjs }],
  [/node\.js/i, { brand: siNodedotjs }],
  [/prisma/i, { brand: siPrisma }],
  [/redis|bullmq/i, { brand: siRedis }],
  [/react hook form|zod/i, { brand: siReacthookform }],
  [/tanstack/i, { brand: siReactquery }],
  [/react/i, { brand: siReact }],
  [/next\.js/i, { brand: siNextdotjs }],
  [/angular/i, { brand: siAngular }],
  [/vitest/i, { brand: siVitest }],
  [/vite/i, { brand: siVite }],
  [/rxjs/i, { brand: siReactivex }],
  [/i18next/i, { brand: siI18next }],
  [/postgres/i, { brand: siPostgresql }],
  [/stripe/i, { brand: siStripe }],
  [/search console/i, { brand: siGooglesearchconsole }],
  [/llm/i, { glyph: Bot }],
  [/docker/i, { brand: siDocker }],
  [/github actions/i, { brand: siGithubactions }],
  [/git/i, { brand: siGit }],
  [/nginx/i, { brand: siNginx }],
  [/postman/i, { brand: siPostman }],
  [/sql/i, { glyph: Database }],
  [/signalr/i, { glyph: Radio }],
  [/hangfire/i, { glyph: Timer }],
  [/rest api/i, { glyph: Braces }],
  [/zatca/i, { glyph: FileCheck2 }],
  [/microsoft graph/i, { glyph: Link2 }],
  [/webhook/i, { glyph: Webhook }],
  [/clean|onion|multi-tenant/i, { glyph: Layers }],
  [/repository|specification|cqrs|solid/i, { glyph: Blocks }],
  [/rbac/i, { glyph: ShieldCheck }],
  [/idempotency/i, { glyph: Repeat }],
  [/core web vitals|bundle|code splitting/i, { glyph: Gauge }],
  [/canonical|slug|json-ld/i, { glyph: Route }],
  [/responsive/i, { glyph: MonitorSmartphone }],
  [/playwright|testing/i, { glyph: TestTube2 }],
  [/agile/i, { glyph: Users }],
  [/code review/i, { glyph: GitPullRequest }],
  [/ai-assisted/i, { glyph: Sparkles }],
  [/automapper/i, { glyph: Workflow }],
  [/identity/i, { glyph: KeyRound }],
  [/visual studio|vs code/i, { glyph: Code2 }],
];

const cssIcon: [RegExp, IconSource] = [/^css/i, { brand: siCss }];

export const BrandGlyph = ({ icon, className }: { icon: SimpleIcon; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d={icon.path} />
  </svg>
);

export const WhatsAppIcon = ({ className }: { className?: string }) => (
  <BrandGlyph icon={siWhatsapp} className={className} />
);

const TechIcon = ({ name, className = "h-3.5 w-3.5" }: { name: string; className?: string }) => {
  const match = [cssIcon, ...rules].find(([pattern]) => pattern.test(name))?.[1];
  if (!match) return null;
  if ("brand" in match) return <BrandGlyph icon={match.brand} className={className} />;
  const Glyph = match.glyph;
  return <Glyph className={className} strokeWidth={1.75} aria-hidden="true" />;
};

export default TechIcon;
