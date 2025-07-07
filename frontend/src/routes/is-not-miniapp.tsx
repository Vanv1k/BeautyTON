import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/is-not-miniapp')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-center">
      Извини, но открыть приложение можно только в телеграме!
    </div>
  );
}
