export default function AboutPage() {
const researchers = [
{ name: 'Dr. Aisha Al Mansoori', role: 'Principal Investigator', img: '/researcher1.jpg', contact: 'aisha@uni.ac.ae' },
{ name: 'Mohamad Abousahyoun', role: 'Lead Developer', img: '/researcher2.jpg', contact: 'mohamad@uni.ac.ae' },
{ name: 'John Doe', role: 'Data Scientist', img: '/researcher3.jpg', contact: 'john@uni.ac.ae' }
]


return (
<div className="max-w-6xl mx-auto px-4 py-20">
<h1 className="text-4xl md:text-5xl font-bold mb-12">About Us</h1>
<div className="grid md:grid-cols-3 gap-10">
{researchers.map((r, i) => (
<div key={i} className="card text-center">
<img src={r.img} alt={r.name} className="w-32 h-32 mx-auto rounded-full object-cover mb-4 shadow-md" />
<h3 className="text-lg font-semibold">{r.name}</h3>
<p className="text-sm text-zinc-500">{r.role}</p>
<a href={`mailto:${r.contact}`} className="text-blue-600 hover:underline mt-2 block">{r.contact}</a>
</div>
))}
</div>
</div>
)
}