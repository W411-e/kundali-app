import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Arjun Sharma",
    role: "Yoga Instructor",
    content:
      "Destiny Engine provided insights into my birth chart that were remarkably accurate. The AI interpretations helped me understand my strengths and challenges in a way traditional readings never could.",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    name: "Priya Poudel",
    role: "Software Engineer",
    content:
      "As someone who values both tradition and technology, I was impressed by how Destiny Engine blends ancient Vedic wisdom with modern AI. The Dasha predictions have been particularly helpful for my career planning.",
    avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    name: "Ravi Lamichhane",
    role: "Business Consultant",
    content:
      "The level of detail in my Kundali report was outstanding. I've consulted with several astrologers before, but the clarity and depth provided by Destiny Engine was truly exceptional.",
    // avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600",
    avatar: "data:image/jpeg;base64,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",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            What Our Users Say
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Discover how Destiny Engine has helped people gain deeper insights into their cosmic journey
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card p-6 shadow transition-all hover:shadow-md"
            >
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>
              <blockquote className="mb-6 text-muted-foreground">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center">
                <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;