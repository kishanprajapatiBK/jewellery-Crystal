'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, RotateCcw, Sparkles, Check, Compass, ShieldCheck } from 'lucide-react';
import { QUIZ_QUESTIONS } from '@/data/quiz';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

export default function CrystalQuiz() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const { addToCart } = useCart();

  const currentQuestion = QUIZ_QUESTIONS[currentStepIndex];

  const handleSelectOption = (value: string) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(updatedAnswers);

    if (currentStepIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStepIndex(0);
    setIsCompleted(false);
  };

  // Calculate 3 personalized stone recommendations
  const recommendedProducts: Product[] = isCompleted
    ? PRODUCTS.filter((p) => {
        const intentionAnswer = answers[1];
        return p.intention === intentionAnswer || p.category === answers[3];
      }).slice(0, 3).concat(PRODUCTS.slice(0, 3)).slice(0, 3)
    : [];

  return (
    <section className="py-20 bg-auraa-surface border-t border-auraa-border/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-auraa-bg rounded-2xl p-6 sm:p-10 border border-auraa-border shadow-card relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-auraa-gold/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-auraa-gold">
              <Compass className="w-3.5 h-3.5" /> Interactive Matcher
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-auraa-charcoal">
              Find Your Stone Companion
            </h2>
            <p className="text-xs sm:text-sm text-auraa-muted max-w-lg mx-auto font-sans">
              Answer 4 brief questions to discover stone specimens aligned with your space and personal energy.
            </p>
          </div>

          {!isCompleted ? (
            <div className="space-y-8">
              {/* Step Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-auraa-muted uppercase tracking-wider">
                  <span>Step {currentStepIndex + 1} of {QUIZ_QUESTIONS.length}: {currentQuestion.stepName}</span>
                  <span>{Math.round(((currentStepIndex + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="w-full bg-auraa-border h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-auraa-gold h-full transition-all duration-300 rounded-full"
                    style={{ width: `${((currentStepIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Title */}
              <div className="text-center space-y-1 pt-2">
                <h3 className="font-serif text-2xl text-auraa-charcoal font-normal">
                  {currentQuestion.title}
                </h3>
                <p className="text-xs text-auraa-muted">{currentQuestion.subtitle}</p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {currentQuestion.options.map((opt) => {
                  const isSelected = answers[currentQuestion.id] === opt.value;
                  return (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => handleSelectOption(opt.value)}
                      className={`p-5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between group ${
                        isSelected
                          ? 'border-auraa-gold bg-auraa-gold/10 shadow-soft'
                          : 'border-auraa-border bg-white hover:border-auraa-gold/60 hover:bg-auraa-surface'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-sm text-auraa-charcoal group-hover:text-auraa-gold transition-colors">
                          {opt.label}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-auraa-gold flex-shrink-0" />}
                      </div>
                      {opt.description && (
                        <p className="text-xs text-auraa-muted leading-relaxed font-sans">{opt.description}</p>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Back / Navigation button */}
              {currentStepIndex > 0 && (
                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                    className="text-xs font-semibold uppercase tracking-wider text-auraa-muted hover:text-auraa-charcoal"
                  >
                    ← Back to Previous Step
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-auraa-gold/10 text-auraa-gold flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-auraa-charcoal">
                  Your Curated Stone Matches
                </h3>
                <p className="text-xs text-auraa-muted">
                  Based on your preference for <strong className="text-auraa-charcoal">{answers[1]}</strong> and your living space layout:
                </p>
              </div>

              {/* Recommended Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg border border-auraa-border p-4 flex flex-col justify-between shadow-soft hover:shadow-hover transition-all"
                  >
                    <div>
                      <div className="relative h-44 w-full bg-auraa-surface rounded-md overflow-hidden mb-3">
                        <Image
                          src={product.images.primary}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="240px"
                        />
                      </div>
                      <span className="text-[10px] text-auraa-gold font-semibold uppercase tracking-wider block mb-1">
                        {product.intention} • {product.category}
                      </span>
                      <h4 className="font-serif text-base text-auraa-charcoal font-normal line-clamp-1 mb-1">
                        {product.name}
                      </h4>
                      <p className="text-xs text-auraa-muted line-clamp-2 mb-3">{product.subtitle}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-auraa-border/60">
                      <div className="flex justify-between items-center">
                        <span className="font-serif font-semibold text-sm">₹{product.price.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] text-auraa-sage font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> 100% Match
                        </span>
                      </div>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="w-full bg-auraa-charcoal hover:bg-black text-auraa-bg text-xs uppercase font-semibold py-2 rounded transition-colors"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reset Quiz Button */}
              <div className="text-center pt-4">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 text-xs uppercase font-semibold tracking-wider text-auraa-muted hover:text-auraa-gold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Crystal Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
