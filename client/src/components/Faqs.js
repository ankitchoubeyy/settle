import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: 1,
    question: "Is there a free trial?",
    answer: "Yes, you can try our service for free for 30 days.",
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer: "We accept credit cards, PayPal, and other popular payment methods.",
  },
  {
    id: 3,
    question: "Can I cancel my subscription at any time?",
    answer: "Yes, you can cancel your subscription at any time.",
  },
];

const Faqs = () => {
  return (
    <section id="faqs" className="py-20 bg-background text-foreground">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find answers to the most common questions about our service.
          </p>
        </div>

        {/* Card Wrapper */}
        <div className="p-6 md:p-8">
          <Accordion type="single" collapsible className="space-y-1">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`item-${faq.id}`}
                className="border-b last:border-b-0 pb-4"
              >
                <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground mt-2 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
