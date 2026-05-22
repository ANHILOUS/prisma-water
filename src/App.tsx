/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Solutions from './components/Solutions';
import Impact from './components/Impact';
import Standards from './components/Standards';
import Inquiries from './components/Inquiries';
import SmoothScroll from './components/SmoothScroll';

export default function App() {
  return (
    <SmoothScroll>
      <main className="bg-black min-h-screen text-[#DEDBC8] overflow-x-hidden">
        <Hero />
        <About />
        <Features />
        <Solutions />
        <Impact />
        <Standards />
        <Inquiries />
      </main>
    </SmoothScroll>
  );
}

