export default function TeamGrid() {
const team = [
{ name: 'Dr Mohammad Daoud', role: 'Supervisor', email: 'lead@example.com' },
{ name: 'Dr Mohammad Jaradat', role: 'Co-supervisor', email: 'ds@example.com' },
{ name: 'Mohamad Abousahyoun', role: 'Backend • Infra', email: 'se@example.com' },
{ name: 'Abdallah Lootah', role: 'Backend • Infra', email: 'se@example.com' },
{ name: 'Khalid Saadat', role: 'Backend • Infra', email: 'se@example.com' },
{name: 'Aljawharah Alanazi', role: 'Backend • Infra', email: 'se@example.com' }


]
return (
<div className="grid md:grid-cols-3 gap-6">
{team.map((m) => (
<div key={m.email} className="card">
<div className="aspect-square rounded-xl bg-grid mb-4" />
<h3 className="font-semibold">{m.name}</h3>
<p className="text-sm text-zinc-500">{m.role}</p>
<a href={`mailto:${m.email}`} className="text-sm mt-2 inline-block underline">{m.email}</a>
</div>
))}
</div>
)
}