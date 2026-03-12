import React, { useState, useEffect } from 'react';
import { 
  Coins, Package, Crosshair, Shirt, 
  Trophy, ChevronRight, X, 
  PaintBucket, Wrench, ImageIcon, Ticket, RotateCw,
  Car, Bomb, Shield, Briefcase, Navigation, Heart, Target, Gift, Zap
} from 'lucide-react';

// --- Fully Expanded Main Loot Pool ---
const LOOT_POOL = {
  mythic: [
    { name: 'Blood Raven X-Suit', type: 'Dress', icon: Shirt },
    { name: 'Golden Pharaoh X-Suit', type: 'Dress', icon: Shirt },
    { name: 'Poseidon X-Suit', type: 'Dress', icon: Shirt },
    { name: 'Ignis X-Suit', type: 'Dress', icon: Shirt },
    { name: 'Silvanus X-Suit', type: 'Dress', icon: Shirt },
    { name: 'Iridescence X-Suit', type: 'Dress', icon: Shirt },
    { name: 'Avalanche X-Suit', type: 'Dress', icon: Shirt },
    { name: 'Fiend Huntress Set', type: 'Dress', icon: Shirt },
    { name: 'Mummy Set (Yellow)', type: 'Dress', icon: Shirt },
    { name: 'Vampire Set', type: 'Dress', icon: Shirt },
    { name: 'BAPE Yellow Set', type: 'Dress', icon: Shirt },
    { name: 'Godzilla Carapace Set', type: 'Dress', icon: Shirt },
    { name: 'Mechagodzilla Set', type: 'Dress', icon: Shirt },
    { name: 'Neon Lord Set', type: 'Dress', icon: Shirt }
  ],
  legendary: [
    { name: 'M416 - The Fool', type: 'Gun', icon: Crosshair, isUpgradable: true },
    { name: 'AKM - Glacier', type: 'Gun', icon: Crosshair, isUpgradable: true },
    { name: 'AWM - Field Commander', type: 'Gun', icon: Crosshair, isUpgradable: true },
    { name: 'Kar98k - Terror Fang', type: 'Gun', icon: Crosshair, isUpgradable: true },
    { name: 'UZI - Savagery', type: 'Gun', icon: Crosshair, isUpgradable: true },
    { name: 'DP28 - Gilded Jade', type: 'Gun', icon: Crosshair, isUpgradable: true },
    { name: 'M24 - Pharoah\'s Might', type: 'Gun', icon: Crosshair, isUpgradable: true },
    { name: 'Groza - River of Styx', type: 'Gun', icon: Crosshair, isUpgradable: true },
    { name: 'SCAR-L - Water Blaster', type: 'Gun', icon: Crosshair, isUpgradable: true },
    { name: 'Vector - Blood Tooth', type: 'Gun', icon: Crosshair, isUpgradable: true },
    { name: 'M416 - Gold Plate', type: 'Gun', icon: Crosshair },
    { name: 'AKM - Gold Plate', type: 'Gun', icon: Crosshair },
    { name: 'Kar98k - Gold Plate', type: 'Gun', icon: Crosshair },
    { name: 'SKS - Gold Plate', type: 'Gun', icon: Crosshair },
    { name: 'UMP45 - Gold Plate', type: 'Gun', icon: Crosshair },
    { name: 'Dacia - Shark Bite', type: 'Vehicle', icon: Car },
    { name: 'UAZ - Godzilla', type: 'Vehicle', icon: Car },
    { name: 'Mirado - Golden', type: 'Vehicle', icon: Car },
    { name: 'Buggy - Lifesaver', type: 'Vehicle', icon: Car },
    { name: 'Motorcycle - Ghost Rider', type: 'Vehicle', icon: Car },
    { name: 'Dacia - Police', type: 'Vehicle', icon: Car },
    { name: 'UAZ - Military', type: 'Vehicle', icon: Car },
    { name: 'Boat - Kraken', type: 'Vehicle', icon: Car },
    { name: 'Backpack - Terror Fang', type: 'Bag', icon: Briefcase },
    { name: 'Backpack - Blood Raven', type: 'Bag', icon: Briefcase },
    { name: 'Backpack - Golden Pharaoh', type: 'Bag', icon: Briefcase },
    { name: 'Backpack - Poseidon', type: 'Bag', icon: Briefcase },
    { name: 'Backpack - Ignis', type: 'Bag', icon: Briefcase },
    { name: 'Helmet - Terror Fang', type: 'Helmet', icon: Shield },
    { name: 'Helmet - Blood Raven', type: 'Helmet', icon: Shield },
    { name: 'Helmet - Golden Pharaoh', type: 'Helmet', icon: Shield },
    { name: 'Helmet - Poseidon', type: 'Helmet', icon: Shield },
    { name: 'Helmet - Ignis', type: 'Helmet', icon: Shield },
    { name: 'Grenade - Golden', type: 'Throwable', icon: Bomb },
    { name: 'Grenade - Terror Fang', type: 'Throwable', icon: Bomb },
    { name: 'Molotov - Hellfire', type: 'Throwable', icon: Bomb },
    { name: 'Smoke - Neon', type: 'Throwable', icon: Bomb },
    { name: 'Red Dot - Glacier', type: 'Attachment', icon: Target },
    { name: '4x Scope - Glacier', type: 'Attachment', icon: Target },
    { name: '6x Scope - Glacier', type: 'Attachment', icon: Target },
    { name: 'Suppressor (AR) - Glacier', type: 'Attachment', icon: Target },
    { name: 'Suppressor (SR) - Glacier', type: 'Attachment', icon: Target },
    { name: 'Ext. Mag (AR) - Glacier', type: 'Attachment', icon: Target },
    { name: 'Red Dot - The Fool', type: 'Attachment', icon: Target },
    { name: '4x Scope - The Fool', type: 'Attachment', icon: Target },
    { name: 'Suppressor (AR) - The Fool', type: 'Attachment', icon: Target },
  ],
  epic: [
    { name: 'Paint x5', type: 'Upgrade', icon: PaintBucket },
    { name: 'Mini Material', type: 'Upgrade', icon: Wrench },
    { name: 'Premium Crate Coupon', type: 'Coupon', icon: Ticket },
    { name: 'Classic Crate Coupon', type: 'Coupon', icon: Ticket },
    { name: 'Supply Crate Coupon', type: 'Coupon', icon: Ticket },
    { name: 'Premium Crate Scrap x5', type: 'Coupon', icon: Ticket },
    { name: 'Graffiti (Chicken Dinner)', type: 'Sticker', icon: ImageIcon },
    { name: 'Graffiti (Gotcha)', type: 'Sticker', icon: ImageIcon },
    { name: 'Graffiti (Curse)', type: 'Sticker', icon: ImageIcon },
    { name: 'Graffiti (Surrender)', type: 'Sticker', icon: ImageIcon },
    { name: 'Graffiti (Target)', type: 'Sticker', icon: ImageIcon },
    { name: 'Graffiti (Winner)', type: 'Sticker', icon: ImageIcon },
    { name: 'Graffiti (Skull)', type: 'Sticker', icon: ImageIcon },
    { name: 'Graffiti (Heart)', type: 'Sticker', icon: ImageIcon },
    { name: 'Graffiti (GG)', type: 'Sticker', icon: ImageIcon },
    { name: 'Graffiti (Noob)', type: 'Sticker', icon: ImageIcon },
    { name: 'Graffiti (Pro)', type: 'Sticker', icon: ImageIcon },
    { name: 'Graffiti (Sniper)', type: 'Sticker', icon: ImageIcon },
    { name: 'Graffiti (Rush)', type: 'Sticker', icon: ImageIcon },
    { name: 'Graffiti (Camp)', type: 'Sticker', icon: ImageIcon },
    { name: 'Graffiti (Loot)', type: 'Sticker', icon: ImageIcon },
    { name: 'Desert Camo - M416', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - AKM', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - SCAR-L', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - M16A4', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - GROZA', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - AUG', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - QBZ', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - M762', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - Mk47', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - G36C', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - Kar98k', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - M24', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - AWM', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - SKS', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - VSS', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - Mini14', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - Mk14', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - SLR', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - QBU', type: 'Gun', icon: Crosshair },
    { name: 'Desert Camo - UMP45', type: 'Gun', icon: Crosshair },
    { name: 'Stealth - Dacia', type: 'Vehicle', icon: Car },
    { name: 'Rugged - Dacia', type: 'Vehicle', icon: Car },
    { name: 'Stealth - UAZ', type: 'Vehicle', icon: Car },
    { name: 'Rugged - UAZ', type: 'Vehicle', icon: Car },
    { name: 'Stealth - Buggy', type: 'Vehicle', icon: Car },
    { name: 'Rugged - Buggy', type: 'Vehicle', icon: Car },
    { name: 'Stealth - Mirado', type: 'Vehicle', icon: Car },
    { name: 'Rugged - Mirado', type: 'Vehicle', icon: Car },
    { name: 'Stealth - Motorcycle', type: 'Vehicle', icon: Car },
    { name: 'Rugged - Motorcycle', type: 'Vehicle', icon: Car },
    { name: 'Desert Camo - Red Dot', type: 'Attachment', icon: Target },
    { name: 'Desert Camo - Holo', type: 'Attachment', icon: Target },
    { name: 'Desert Camo - 2x Scope', type: 'Attachment', icon: Target },
    { name: 'Desert Camo - 3x Scope', type: 'Attachment', icon: Target },
    { name: 'Desert Camo - 4x Scope', type: 'Attachment', icon: Target },
    { name: 'Desert Camo - 6x Scope', type: 'Attachment', icon: Target },
    { name: 'Desert Camo - 8x Scope', type: 'Attachment', icon: Target },
    { name: 'Desert Camo - Suppressor (AR)', type: 'Attachment', icon: Target },
    { name: 'Desert Camo - Compensator (AR)', type: 'Attachment', icon: Target },
    { name: 'Desert Camo - Flash Hider (AR)', type: 'Attachment', icon: Target },
    { name: 'Desert Camo - Ext. Mag (AR)', type: 'Attachment', icon: Target },
    { name: 'Desert Camo - Quickdraw (AR)', type: 'Attachment', icon: Target },
    { name: 'Desert Camo - Tactical Stock', type: 'Attachment', icon: Target },
    { name: 'Desert Camo - Cheek Pad', type: 'Attachment', icon: Target },
    { name: 'Parachute Trail (Red)', type: 'Parachute', icon: Navigation },
    { name: 'Parachute Trail (Green)', type: 'Parachute', icon: Navigation },
    { name: 'Parachute Trail (Yellow)', type: 'Parachute', icon: Navigation },
    { name: 'Parachute Trail (Pink)', type: 'Parachute', icon: Navigation },
    { name: 'Parachute Trail (Blue)', type: 'Parachute', icon: Navigation },
    { name: 'Neon Parachute', type: 'Parachute', icon: Navigation },
    { name: 'Desert Parachute', type: 'Parachute', icon: Navigation },
    { name: 'Camo Parachute', type: 'Parachute', icon: Navigation },
    { name: 'Skull Parachute', type: 'Parachute', icon: Navigation },
    { name: 'Eagle Parachute', type: 'Parachute', icon: Navigation }
  ],
  rare: [
    { name: 'Silver Fragments x30', type: 'Currency', icon: Coins },
    { name: 'BP x1000', type: 'Currency', icon: Coins },
    { name: 'Popularity - Motorcycle', type: 'Popularity', icon: Heart }
  ]
};

// --- Sub Crate (Bonus) Loot Pool (6 Items, Random 1/6 chance) ---
const SUB_CRATE_POOL = [
  { name: 'M416 - The Fool', type: 'Gun', icon: Crosshair, rarity: 'legendary', isUpgradable: true },
  { name: 'AKM - Glacier', type: 'Gun', icon: Crosshair, rarity: 'legendary', isUpgradable: true },
  { name: 'AWM - Field Commander', type: 'Gun', icon: Crosshair, rarity: 'legendary', isUpgradable: true },
  { name: 'Kar98k - Terror Fang', type: 'Gun', icon: Crosshair, rarity: 'legendary', isUpgradable: true },
  { name: 'Paint x10', type: 'Upgrade', icon: PaintBucket, rarity: 'epic' },
  { name: 'Paint x20', type: 'Upgrade', icon: PaintBucket, rarity: 'epic' }
];

const RARITY_INFO = {
  mythic: { name: 'Mythic', color: 'text-red-500', bg: 'bg-red-500/20', border: 'border-red-500', glow: 'shadow-[0_0_40px_rgba(239,68,68,0.7)]', hex: '#ef4444' },
  legendary: { name: 'Legendary', color: 'text-pink-400', bg: 'bg-pink-400/20', border: 'border-pink-400', glow: 'shadow-[0_0_30px_rgba(244,114,182,0.6)]', hex: '#f472b6' },
  epic: { name: 'Epic', color: 'text-purple-400', bg: 'bg-purple-400/20', border: 'border-purple-400', glow: '', hex: '#c084fc' },
  rare: { name: 'Rare', color: 'text-blue-400', bg: 'bg-blue-400/20', border: 'border-blue-400', glow: '', hex: '#60a5fa' }
};

export default function App() {
  const [uc, setUc] = useState(999999);
  const [ucSpent, setUcSpent] = useState(0);
  const [inventory, setInventory] = useState([]);
  
  // Progress & Sub Crate States
  const [totalDraws, setTotalDraws] = useState(0);
  const [bonusCratesOpened, setBonusCratesOpened] = useState(0);

  // UI States
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentDrops, setCurrentDrops] = useState([]);
  const [showInventory, setShowInventory] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  const [showcaseQueue, setShowcaseQueue] = useState([]);
  const [currentShowcaseIndex, setCurrentShowcaseIndex] = useState(0);
  const [showcaseConversion, setShowcaseConversion] = useState(false);

  // Auto-Simulate States
  const [wishedItem, setWishedItem] = useState(null);
  const [showWishModal, setShowWishModal] = useState(false);
  const [isAutoSimulating, setIsAutoSimulating] = useState(false);
  const [simStats, setSimStats] = useState({ draws: 0, cost: 0, mythics: 0, legendaries: 0 });

  // Derived Bonus Stats
  const bonusProgress = totalDraws % 50;
  const availableBonusCrates = Math.floor(totalDraws / 50) - bonusCratesOpened;

  const drawMainItem = () => {
    const rand = Math.random() * 100;
    let rarity;
    
    if (rand < 0.75) rarity = 'mythic';
    else if (rand < 4.32) rarity = 'legendary';
    else if (rand < 58.65) rarity = 'epic';
    else rarity = 'rare';

    const pool = LOOT_POOL[rarity];
    const item = pool[Math.floor(Math.random() * pool.length)];
    return { ...item, rarity, uniqueId: Math.random().toString(36).substr(2, 9) };
  };

  const handleDraw = (times) => {
    const cost = times === 1 ? 60 : 540;
    
    if (uc < cost) {
      alert("Not enough UC! Click the + button to add more.");
      return;
    }

    setUc(prev => prev - cost);
    setUcSpent(prev => prev + cost);
    setTotalDraws(prev => prev + times);
    
    setIsSpinning(true);
    setSkipAnimation(false);
    setShowResults(false);
    setShowcaseQueue([]);
    setShowcaseConversion(false);

    setTimeout(() => {
      const drops = [];
      const showcases = [];
      const tempUpgradablesInInventory = new Set(inventory.filter(i => i.isUpgradable).map(i => i.name));
      const newInventoryAdditions = [];

      for (let i = 0; i < times; i++) {
        const item = drawMainItem();
        let dropData = { ...item };

        if (item.isUpgradable) {
          if (tempUpgradablesInInventory.has(item.name)) {
            dropData.isDuplicate = true;
            dropData.convertedTo = {
              name: 'Gun Lab Material x3',
              type: 'Material',
              icon: Wrench,
              rarity: 'legendary',
              uniqueId: Math.random().toString(36).substr(2, 9)
            };
            newInventoryAdditions.push(dropData.convertedTo);
          } else {
            tempUpgradablesInInventory.add(item.name);
            newInventoryAdditions.push(dropData);
          }
        } else {
          newInventoryAdditions.push(dropData);
        }

        drops.push(dropData);

        if (dropData.rarity === 'mythic' || dropData.rarity === 'legendary') {
          showcases.push(dropData);
        }
      }
      
      setCurrentDrops(drops);
      setInventory(prev => [...newInventoryAdditions, ...prev]);
      
      if (showcases.length > 0) {
        setShowcaseQueue(showcases);
        setCurrentShowcaseIndex(0);
      } else {
        setShowResults(true);
      }
      
      setIsSpinning(false);
    }, 1500); 
  };

  const handleBonusDraw = () => {
    if (availableBonusCrates <= 0) return;

    setBonusCratesOpened(prev => prev + 1);
    setIsSpinning(true);
    setShowResults(false);
    setShowcaseQueue([]);
    setShowcaseConversion(false);

    setTimeout(() => {
      const item = SUB_CRATE_POOL[Math.floor(Math.random() * SUB_CRATE_POOL.length)];
      let dropData = { ...item, uniqueId: Math.random().toString(36).substr(2, 9) };

      const tempUpgradablesInInventory = new Set(inventory.filter(i => i.isUpgradable).map(i => i.name));
      
      if (item.isUpgradable && tempUpgradablesInInventory.has(item.name)) {
        dropData.isDuplicate = true;
        dropData.convertedTo = {
          name: 'Gun Lab Material x3',
          type: 'Material',
          icon: Wrench,
          rarity: 'legendary',
          uniqueId: Math.random().toString(36).substr(2, 9)
        };
        setInventory(prev => [dropData.convertedTo, ...prev]);
      } else {
        setInventory(prev => [dropData, ...prev]);
      }

      setCurrentDrops([dropData]);
      setShowcaseQueue([dropData]);
      setCurrentShowcaseIndex(0);
      setIsSpinning(false);
    }, 1500);
  };

  // --- AUTO-SIMULATE LOGIC ---
  const startAutoSimulation = () => {
    if (!wishedItem) return;
    setIsAutoSimulating(true);
    setSimStats({ draws: 0, cost: 0, mythics: 0, legendaries: 0 });

    let localDraws = 0;
    let localCost = 0;
    let localMythics = 0;
    let localLegendaries = 0;
    let currentTotalDraws = totalDraws;
    let found = false;
    let simInventoryAdditions = [];
    
    // Safety cap: Prevent infinite loops destroying browser (1.5M UC limit roughly)
    const MAX_DRAWS = 25000; 

    const runBatch = () => {
      // Process 20 draws per frame to create a satisfying rapid-fire counter effect
      for (let i = 0; i < 20; i++) {
        localDraws++;
        currentTotalDraws++;
        localCost += 60;

        const item = drawMainItem();
        simInventoryAdditions.push({...item, uniqueId: Math.random().toString(36).substr(2, 9)});

        if (item.rarity === 'mythic') localMythics++;
        if (item.rarity === 'legendary') localLegendaries++;

        if (item.name === wishedItem.name) {
          found = true;
          break;
        }

        // Check Sub-crate Drops during simulation!
        if (currentTotalDraws % 50 === 0) {
          const bonusItem = SUB_CRATE_POOL[Math.floor(Math.random() * SUB_CRATE_POOL.length)];
          simInventoryAdditions.push({...bonusItem, uniqueId: Math.random().toString(36).substr(2, 9)});
          if (bonusItem.rarity === 'legendary') localLegendaries++;
          if (bonusItem.name === wishedItem.name) {
             found = true;
             break;
          }
        }

        if (localDraws >= MAX_DRAWS) break;
      }

      setSimStats({ draws: localDraws, cost: localCost, mythics: localMythics, legendaries: localLegendaries });

      if (found || localDraws >= MAX_DRAWS) {
        setIsAutoSimulating(false);
        // Fund account automatically if they went broke during simulation
        setUc(prev => {
           let remaining = prev - localCost;
           if (remaining < 0) remaining = 50000; // Secretly refill if bankrupt
           return remaining;
        });
        setUcSpent(prev => prev + localCost);
        setTotalDraws(currentTotalDraws);
        // Automatically open the bonus crates earned during simulation to keep logic clean
        setBonusCratesOpened(Math.floor(currentTotalDraws / 50)); 
        setInventory(prev => [...simInventoryAdditions.reverse(), ...prev]);

        // Launch into Showcase
        setShowcaseQueue([{
          ...wishedItem,
          isSimulationTarget: true,
          simFinalStats: { draws: localDraws, cost: localCost, mythics: localMythics, legendaries: localLegendaries, failed: !found }
        }]);
        setCurrentShowcaseIndex(0);
      } else {
        requestAnimationFrame(runBatch);
      }
    };

    requestAnimationFrame(runBatch);
  };

  const nextShowcase = () => {
    setShowcaseConversion(false);
    if (currentShowcaseIndex < showcaseQueue.length - 1) {
      setCurrentShowcaseIndex(prev => prev + 1);
    } else {
      setShowcaseQueue([]);
      // Don't show generic summary if we just finished an auto-sim
      const wasSimTarget = showcaseQueue[0]?.isSimulationTarget;
      if (!wasSimTarget) {
         setShowResults(true);
      } else {
         setWishedItem(null); // Clear wish after acquiring
      }
    }
  };

  useEffect(() => {
    if (showcaseQueue.length > 0) {
      const activeItem = showcaseQueue[currentShowcaseIndex];
      if (activeItem?.isDuplicate && !activeItem?.isSimulationTarget) {
        const timer = setTimeout(() => {
          setShowcaseConversion(true);
        }, 1800);
        return () => clearTimeout(timer);
      }
    }
  }, [currentShowcaseIndex, showcaseQueue]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans overflow-hidden flex flex-col relative select-none">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-5px) rotate(-5deg); }
          50% { transform: translateX(5px) rotate(5deg); }
          75% { transform: translateX(-5px) rotate(-5deg); }
        }
        .crate-shake { animation: shake 0.4s ease-in-out infinite; filter: drop-shadow(0 0 30px rgba(250, 204, 21, 0.6)); }
        
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .item-pop { animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; opacity: 0; }
        
        @keyframes cinematicZoom {
          0% { transform: scale(0.8) translateY(20px); opacity: 0; filter: brightness(2) blur(10px); }
          100% { transform: scale(1) translateY(0); opacity: 1; filter: brightness(1) blur(0px); }
        }
        .cinematic-reveal { animation: cinematicZoom 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

        @keyframes flashWhite {
          0% { background-color: transparent; }
          50% { background-color: rgba(255,255,255,1); }
          100% { background-color: transparent; }
        }
        .flash-overlay { animation: flashWhite 0.8s ease-out forwards; pointer-events: none; }
      `}</style>

      {/* Header */}
      <header className="flex flex-wrap justify-between items-center p-3 md:p-4 bg-zinc-900/80 backdrop-blur border-b border-zinc-800 z-20 gap-3">
        <div className="flex items-center gap-2 md:gap-3">
          <Trophy className="text-yellow-500 w-5 h-5 md:w-6 md:h-6" />
          <div>
            <h1 className="text-base md:text-xl font-bold italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 leading-tight">
              CLASSIC CRATE
            </h1>
            <p className="text-[10px] md:text-xs text-zinc-400 font-medium tracking-wider">
              UC SPENT: <span className="text-yellow-400">{ucSpent.toLocaleString()}</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4 ml-auto">
          <button 
            onClick={() => setShowInventory(true)}
            className="flex items-center gap-1.5 md:gap-2 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-semibold transition"
          >
            <Package className="w-3.5 h-3.5 md:w-4 md:h-4" /> 
            <span className="hidden sm:inline">Inventory</span> 
            <span>({inventory.length})</span>
          </button>

          <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-full pl-2 md:pl-3 pr-1 py-1">
            <Coins className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 mr-1.5 md:mr-2" />
            <span className="font-bold text-sm md:text-base mr-2 md:mr-3">{uc.toLocaleString()}</span>
            <button 
              onClick={() => setUc(prev => prev + 10000)}
              className="bg-yellow-500 hover:bg-yellow-400 text-black rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center font-bold text-sm md:text-lg"
            >
              +
            </button>
          </div>
        </div>
      </header>

      {/* Main Content (The Crate) */}
      <main className="flex-1 flex flex-col items-center justify-center relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-black pb-10 overflow-y-auto overflow-x-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-yellow-500/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>

        {/* Top Info Containers (Mobile Flow vs Desktop Absolute) */}
        <div className="flex flex-col md:flex-row justify-between items-start p-4 z-10 gap-4 md:absolute md:top-6 md:left-6 md:right-6 md:p-0 pointer-events-none">
          
          {/* Drop Rates Info Panel */}
          <div className="bg-black/60 border border-zinc-800 p-3 md:p-4 rounded-xl backdrop-blur-md text-[10px] md:text-xs font-medium space-y-1.5 md:space-y-2 pointer-events-auto hidden sm:block">
            <h3 className="text-zinc-400 uppercase tracking-widest mb-2 md:mb-3 font-bold">Drop Rates</h3>
            <div className="flex justify-between gap-4 md:gap-6"><span className="text-red-500 font-bold">Mythic</span><span>0.75%</span></div>
            <div className="flex justify-between gap-4 md:gap-6"><span className="text-pink-400 font-bold">Legendary</span><span>3.57%</span></div>
            <div className="flex justify-between gap-4 md:gap-6"><span className="text-purple-400 font-bold">Epic</span><span>54.33%</span></div>
            <div className="flex justify-between gap-4 md:gap-6"><span className="text-blue-400 font-bold">Rare</span><span>41.35%</span></div>
          </div>

          <div className="sm:hidden"></div>

          {/* Top Floating Target Info */}
          <div className="flex flex-col items-end pointer-events-auto w-full md:w-auto">
            {wishedItem ? (
              <div className="bg-black/60 border border-purple-500/50 p-2 md:p-3 rounded-xl backdrop-blur-md flex flex-col items-center shadow-[0_0_20px_rgba(168,85,247,0.2)] animate-pulse w-full sm:w-auto max-w-[200px] md:max-w-none self-end">
                  <span className="text-[9px] md:text-[10px] text-purple-300 font-black uppercase tracking-widest mb-1.5 md:mb-2 flex items-center gap-1 text-center">
                    <Target className="w-3 h-3 hidden sm:block" /> Target Acquired
                  </span>
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className={`p-1 md:p-1.5 rounded ${RARITY_INFO[wishedItem.rarity].bg}`}>
                      <wishedItem.icon className={`w-4 h-4 md:w-5 md:h-5 ${RARITY_INFO[wishedItem.rarity].color}`} />
                    </div>
                    <span className={`font-bold text-xs md:text-sm truncate max-w-[100px] md:max-w-none ${RARITY_INFO[wishedItem.rarity].color}`}>{wishedItem.name}</span>
                  </div>
                  <button 
                    onClick={() => setShowWishModal(true)}
                    className="mt-1.5 md:mt-2 text-[10px] md:text-xs text-zinc-400 hover:text-white underline"
                  >
                    Change
                  </button>
              </div>
            ) : (
              <button 
                  onClick={() => setShowWishModal(true)}
                  className="bg-purple-900/40 border border-purple-500/50 hover:bg-purple-800/60 p-2.5 md:p-3 rounded-xl backdrop-blur-md flex items-center gap-2 text-purple-200 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] self-end"
              >
                  <Target className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-bold text-xs md:text-sm tracking-wider uppercase">Set Target</span>
              </button>
            )}
          </div>
        </div>

        {/* Milestone Bonus UI */}
        <div className="w-[90%] max-w-[320px] mb-6 md:mb-8 mt-4 md:mt-0 bg-black/50 border border-zinc-700 rounded-2xl p-3 md:p-4 backdrop-blur-sm z-10 flex flex-col items-center shadow-lg">
          <div className="flex justify-between items-center w-full mb-2 md:mb-3">
            <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-300 flex items-center gap-1.5 md:gap-2">
              <Gift className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-400" /> Milestone Crate
            </h3>
            <span className="text-[10px] md:text-xs font-black text-yellow-400">{bonusProgress} / 50</span>
          </div>

          <div className="w-full h-2.5 md:h-3 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700 relative">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500 relative"
              style={{ width: `${(bonusProgress / 50) * 100}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/30"></div>
            </div>
          </div>

          {availableBonusCrates > 0 && (
            <button 
              onClick={handleBonusDraw}
              disabled={isSpinning || isAutoSimulating}
              className="mt-3 md:mt-4 w-full py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-black text-xs md:text-sm uppercase tracking-widest rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all animate-pulse"
            >
              Open Bonus ({availableBonusCrates})
            </button>
          )}
        </div>

        {/* Crate Visual */}
        <div className={`relative mb-8 md:mb-12 transition-transform duration-300 ${isSpinning ? 'crate-shake' : 'hover:scale-105'} z-10`}>
          <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-yellow-600 to-yellow-900 border-[3px] md:border-4 border-yellow-400 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.25)] md:shadow-[0_0_50px_rgba(250,204,21,0.25)] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <Package className="w-24 h-24 md:w-32 md:h-32 text-yellow-300 opacity-90 relative z-10" />
            <div className="absolute top-0 left-0 w-full h-full border-[6px] md:border-[8px] border-yellow-500/30 rounded-xl"></div>
            <div className="absolute top-1/2 left-0 w-full h-3 md:h-4 bg-zinc-900 -translate-y-1/2 shadow-2xl border-y border-zinc-700"></div>
            <div className="absolute left-1/2 top-0 w-3 md:w-4 h-full bg-zinc-900 -translate-x-1/2 shadow-2xl border-x border-zinc-700"></div>
          </div>
        </div>

        {/* Draw Buttons */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 z-10 w-full px-4 max-w-2xl">
          <button 
            disabled={isSpinning || showcaseQueue.length > 0 || isAutoSimulating}
            onClick={() => handleDraw(1)}
            className="flex-1 min-w-[120px] max-w-[200px] group relative px-4 py-3 md:px-8 md:py-4 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl border border-zinc-700 flex flex-col items-center transition-all overflow-hidden"
          >
            <span className="text-zinc-300 font-black tracking-wider mb-0.5 md:mb-1 relative z-10 text-xs md:text-base">OPEN ONCE</span>
            <div className="flex items-center gap-1 md:gap-1.5 relative z-10">
              <Coins className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold text-sm md:text-xl">60</span>
            </div>
          </button>

          <button 
            disabled={isSpinning || showcaseQueue.length > 0 || isAutoSimulating}
            onClick={() => handleDraw(10)}
            className="flex-1 min-w-[140px] max-w-[220px] group relative px-4 py-3 md:px-8 md:py-4 bg-gradient-to-b from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl border border-yellow-400 flex flex-col items-center transition-all shadow-[0_0_20px_rgba(250,204,21,0.4)] md:shadow-[0_0_30px_rgba(250,204,21,0.4)] overflow-hidden"
          >
            <span className="text-yellow-100 font-black tracking-wider mb-0.5 md:mb-1 relative z-10 text-xs md:text-base text-center">OPEN 10 TIMES</span>
            <div className="flex items-center gap-1 md:gap-1.5 relative z-10">
              <Coins className="w-4 h-4 md:w-5 md:h-5 text-yellow-200" />
              <span className="text-white font-bold text-sm md:text-xl">540</span>
            </div>
          </button>

          {/* Conditional Auto-Simulate Button */}
          {wishedItem && (
            <button 
              disabled={isSpinning || showcaseQueue.length > 0 || isAutoSimulating}
              onClick={startAutoSimulation}
              className="w-full sm:w-auto sm:flex-1 min-w-[140px] max-w-[220px] group relative px-4 py-3 md:px-8 md:py-4 bg-gradient-to-b from-purple-600 to-purple-900 hover:from-purple-500 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl border border-purple-400 flex flex-col items-center transition-all shadow-[0_0_20px_rgba(168,85,247,0.5)] md:shadow-[0_0_30px_rgba(168,85,247,0.5)] overflow-hidden mt-2 sm:mt-0"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
              <span className="text-purple-100 font-black tracking-widest mb-0.5 md:mb-1 relative z-10 flex items-center gap-1 text-xs md:text-base">
                <Zap className="w-3.5 h-3.5 md:w-4 md:h-4" /> AUTO SPIN
              </span>
              <div className="flex items-center gap-1.5 relative z-10">
                <span className="text-purple-200 font-bold text-[9px] md:text-[10px] uppercase tracking-widest">Until Target</span>
              </div>
            </button>
          )}
        </div>
      </main>

      {/* AUTO SIMULATION LOADING OVERLAY */}
      {isAutoSimulating && (
        <div className="absolute inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center backdrop-blur-xl p-4">
            <Zap className="w-16 h-16 md:w-24 md:h-24 text-purple-500 mb-6 md:mb-8 animate-bounce drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]" />
            <h2 className="text-2xl md:text-4xl font-black italic tracking-widest uppercase text-white mb-2 shadow-black drop-shadow-2xl text-center">
              Hunting Target...
            </h2>
            <p className="text-purple-400 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] mb-8 md:mb-12 text-xs md:text-base text-center">Speed Simulation Active</p>

            <div className="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-lg">
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col items-center shadow-inner">
                  <span className="text-zinc-500 text-[10px] md:text-xs uppercase font-bold tracking-widest mb-1 md:mb-2 text-center">Draws Executed</span>
                  <span className="text-3xl md:text-5xl font-black text-white">{simStats.draws.toLocaleString()}</span>
                </div>
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col items-center shadow-inner">
                  <span className="text-zinc-500 text-[10px] md:text-xs uppercase font-bold tracking-widest mb-1 md:mb-2 text-center">UC Burned</span>
                  <span className="text-3xl md:text-5xl font-black text-yellow-400">{simStats.cost.toLocaleString()}</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-8 mt-6 md:mt-8">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]"></div>
                <span className="text-xs md:text-sm font-bold text-zinc-300">Mythics Hit: <span className="text-white">{simStats.mythics}</span></span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-pink-400 shadow-[0_0_10px_rgba(244,114,182,1)]"></div>
                <span className="text-xs md:text-sm font-bold text-zinc-300">Legendaries Hit: <span className="text-white">{simStats.legendaries}</span></span>
              </div>
            </div>
        </div>
      )}

      {/* Target Selection Modal */}
      {showWishModal && (
        <div className="absolute inset-0 z-[80] bg-black/90 flex flex-col items-center justify-center p-2 md:p-4 backdrop-blur-md">
            <div className="w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-xl md:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] md:max-h-[85vh]">
              <div className="p-4 md:p-6 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-900 z-10 rounded-t-xl md:rounded-t-2xl">
                <div>
                  <h2 className="text-lg md:text-2xl font-black italic tracking-widest uppercase flex items-center gap-2">
                    <Target className="w-5 h-5 md:w-6 md:h-6 text-purple-500" /> Select Target
                  </h2>
                  <p className="text-[10px] md:text-xs text-zinc-400 mt-1 uppercase tracking-wider font-bold">Choose an item to auto-simulate for.</p>
                </div>
                <button onClick={() => setShowWishModal(false)} className="p-1.5 md:p-2 hover:bg-zinc-800 rounded-full transition">
                  <X className="w-6 h-6 md:w-8 md:h-8 text-zinc-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 md:space-y-8">
                  {['mythic', 'legendary', 'epic'].map(rarity => (
                    <div key={rarity}>
                      <h3 className={`text-xs md:text-sm font-black uppercase tracking-[0.2em] mb-3 md:mb-4 border-b pb-2 ${RARITY_INFO[rarity].color} border-zinc-800`}>
                        {RARITY_INFO[rarity].name} Tier
                      </h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-3">
                        {LOOT_POOL[rarity].map((item, idx) => {
                            const isSelected = wishedItem?.name === item.name;
                            return (
                              <button
                                key={idx}
                                onClick={() => { setWishedItem({ ...item, rarity }); setShowWishModal(false); }}
                                className={`flex flex-col items-center p-2 md:p-3 rounded-xl border-2 transition-all group ${isSelected ? `border-white bg-zinc-800 scale-105` : `border-zinc-800 bg-zinc-950 hover:border-zinc-600`}`}
                              >
                                <div className={`p-1.5 md:p-2 rounded-lg ${RARITY_INFO[rarity].bg} mb-1.5 md:mb-2`}>
                                  <item.icon className={`w-6 h-6 md:w-8 md:h-8 ${RARITY_INFO[rarity].color}`} />
                                </div>
                                <span className={`text-[8px] md:text-[9px] font-bold text-center leading-tight ${isSelected ? 'text-white' : 'text-zinc-400'} line-clamp-2 h-[20px] md:h-auto`}>
                                  {item.name}
                                </span>
                              </button>
                            );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
        </div>
      )}

      {/* Full Screen Cinematic Showcase */}
      {showcaseQueue.length > 0 && (
        <div className="absolute inset-0 z-[60] bg-zinc-950 flex flex-col items-center justify-center overflow-hidden p-4">
          {(() => {
            const item = showcaseQueue[currentShowcaseIndex];
            const info = RARITY_INFO[item.rarity];
            const isConverting = item.isDuplicate && showcaseConversion;
            
            const displayItem = isConverting ? item.convertedTo : item;
            const displayInfo = isConverting ? RARITY_INFO[item.convertedTo.rarity] : info;
            const ActiveIcon = displayItem.icon;

            return (
              <>
                <div 
                  className="absolute inset-0 opacity-40 transition-colors duration-1000"
                  style={{ background: `radial-gradient(circle at center, ${displayInfo.hex} 0%, transparent 70%)` }}
                ></div>
                
                {isConverting && <div className="absolute inset-0 bg-white z-[65] flash-overlay"></div>}

                <div className="z-10 flex flex-col items-center cinematic-reveal w-full max-w-md">
                  {item.isDuplicate && !isConverting && !item.isSimulationTarget && (
                    <div className="absolute -top-10 md:-top-12 bg-red-600 text-white px-3 md:px-4 py-1 rounded-full font-black tracking-widest uppercase text-xs md:text-sm animate-bounce shadow-lg z-20">
                      Already Owned!
                    </div>
                  )}
                  {isConverting && !item.isSimulationTarget && (
                    <div className="absolute -top-10 md:-top-12 bg-green-500 text-white px-3 md:px-4 py-1 rounded-full font-black tracking-widest uppercase text-xs md:text-sm shadow-lg item-pop z-20">
                      Converted!
                    </div>
                  )}
                  {item.isSimulationTarget && (
                    <div className="absolute -top-12 md:-top-16 bg-purple-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full font-black tracking-widest uppercase text-sm md:text-lg shadow-[0_0_20px_rgba(168,85,247,0.8)] item-pop z-20 flex items-center gap-1.5 md:gap-2 border-2 border-purple-300">
                      <Target className="w-4 h-4 md:w-6 md:h-6" /> <span className="text-center">Target Acquired!</span>
                    </div>
                  )}

                  <div className={`w-48 h-64 md:w-64 md:h-80 flex items-center justify-center rounded-2xl border-4 ${displayInfo.border} bg-zinc-900/80 backdrop-blur-md relative overflow-hidden ${displayInfo.glow} transition-all duration-500 mt-6 md:mt-8`}>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <ActiveIcon className={`w-24 h-24 md:w-32 md:h-32 ${displayInfo.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-transform duration-500 ${isConverting ? 'scale-110' : ''}`} />
                  </div>

                  <h2 className={`mt-6 md:mt-8 text-2xl md:text-4xl font-black italic tracking-widest uppercase text-center drop-shadow-2xl ${displayInfo.color} max-w-2xl px-2 md:px-4 leading-tight`}>
                    {displayItem.name}
                  </h2>
                  <p className="mt-1 md:mt-2 text-sm md:text-xl text-zinc-400 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">
                    {displayInfo.name} {displayItem.type}
                  </p>

                  {/* Auto-Simulation Final Stats Overlay */}
                  {item.isSimulationTarget && item.simFinalStats && (
                    <div className="mt-6 md:mt-10 bg-black/50 border border-zinc-700 p-3 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-md flex flex-wrap justify-center md:flex-nowrap gap-4 md:gap-8 item-pop delay-500 w-full max-w-[300px] md:max-w-none">
                        <div className="flex flex-col items-center w-[40%] md:w-auto">
                          <span className="text-zinc-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-0.5 md:mb-1">Total Draws</span>
                          <span className="text-xl md:text-3xl font-black text-white">{item.simFinalStats.draws.toLocaleString()}</span>
                        </div>
                        <div className="hidden md:block w-px bg-zinc-800"></div>
                        <div className="flex flex-col items-center w-[40%] md:w-auto">
                          <span className="text-zinc-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-0.5 md:mb-1">UC Cost</span>
                          <span className="text-xl md:text-3xl font-black text-yellow-400">{item.simFinalStats.cost.toLocaleString()}</span>
                        </div>
                        <div className="hidden md:block w-px bg-zinc-800"></div>
                        <div className="flex flex-row md:flex-col items-center justify-center gap-4 md:gap-2 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-zinc-800">
                          <span className="text-[9px] md:text-[10px] font-bold text-zinc-300 flex items-center gap-1 md:gap-2">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500"></div> Mythics: {item.simFinalStats.mythics}
                          </span>
                          <span className="text-[9px] md:text-[10px] font-bold text-zinc-300 flex items-center gap-1 md:gap-2">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-pink-400"></div> Legends: {item.simFinalStats.legendaries}
                          </span>
                        </div>
                    </div>
                  )}
                  {item.isSimulationTarget && item.simFinalStats?.failed && (
                    <p className="mt-3 md:mt-4 text-[10px] md:text-sm text-red-500 font-bold uppercase tracking-widest animate-pulse text-center">
                        Max simulation limit reached. Item not found.
                    </p>
                  )}
                </div>

                <button 
                  onClick={nextShowcase}
                  className="my-5 px-8 py-3 md:px-12 md:py-4 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white font-bold text-xs md:text-base uppercase tracking-widest rounded-full transition-all flex items-center gap-1.5 md:gap-2 z-[70]"
                >
                  Tap to Continue <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                </button>
              </>
            );
          })()}
        </div>
      )}

      {/* Results Modal */}
      {showResults && showcaseQueue.length === 0 && (
        <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 md:p-8 backdrop-blur-md overflow-y-auto">
          {!skipAnimation && currentDrops.length > 1 && (
            <button 
              onClick={() => setSkipAnimation(true)}
              className="absolute top-6 right-6 md:top-8 md:right-8 text-zinc-400 hover:text-white flex items-center gap-1 font-semibold text-sm md:text-base"
            >
              Skip <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          )}

          <h2 className="text-xl md:text-3xl font-black italic tracking-widest text-white mb-6 md:mb-12 uppercase text-center shadow-black drop-shadow-lg mt-8 md:mt-0">
            Rewards Summary
          </h2>

          <div className="flex flex-wrap justify-center gap-3 md:gap-5 max-w-6xl pb-8 md:pb-0">
            {currentDrops.map((item, index) => {
              const displayItem = item.isDuplicate ? item.convertedTo : item;
              const info = RARITY_INFO[displayItem.rarity];
              const ItemIcon = displayItem.icon;
              const delay = skipAnimation ? '0s' : `${index * 0.1}s`;

              return (
                <div 
                  key={index} 
                  className={`item-pop relative w-24 h-32 md:w-40 md:h-52 flex flex-col items-center justify-center rounded-lg border-2 bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden group ${info.border} ${item.isDuplicate ? RARITY_INFO.legendary.glow : info.glow}`}
                  style={{ animationDelay: delay }}
                >
                  <div className={`absolute inset-0 opacity-20 ${info.bg}`}></div>
                  
                  {item.isDuplicate && (
                    <div className="absolute top-0 left-0 w-full bg-green-500/80 text-white text-[8px] md:text-[10px] font-black text-center py-0.5 uppercase tracking-wider flex justify-center items-center gap-0.5 md:gap-1">
                      <RotateCw className="w-2 h-2 md:w-3 md:h-3" /> <span className="hidden sm:inline">Converted</span>
                    </div>
                  )}
                  
                  <ItemIcon className={`w-8 h-8 md:w-14 md:h-14 mb-1.5 md:mb-3 ${info.color} drop-shadow-lg group-hover:scale-110 transition-transform`} />
                  
                  <div className="text-center px-1 md:px-2 z-10 w-full">
                    <p className={`font-bold text-[9px] md:text-[11px] mb-0.5 md:mb-1 ${info.color} leading-tight truncate`}>{displayItem.name}</p>
                    <p className="text-[8px] md:text-[10px] text-zinc-500 uppercase tracking-widest">{info.name}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button 
            onClick={() => setShowResults(false)}
            className="mt-6 md:mt-12 px-10 py-3 md:px-16 md:py-4 bg-zinc-100 text-black font-black text-sm md:text-lg uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] mb-8 md:mb-0"
            style={{ animation: 'popIn 0.5s ease forwards', animationDelay: skipAnimation ? '0.1s' : `${currentDrops.length * 0.1 + 0.3}s`, opacity: 0 }}
          >
            Confirm
          </button>
        </div>
      )}

      {/* Inventory Slide-out */}
      {showInventory && (
        <div className="absolute inset-0 z-40 bg-black/80 flex justify-end">
          <div className="w-full sm:max-w-md bg-zinc-900 h-full border-l border-zinc-800 flex flex-col shadow-2xl animate-in slide-in-from-right">
            <div className="p-4 md:p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
              <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                <Package className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" /> My Inventory
              </h2>
              <button onClick={() => setShowInventory(false)} className="p-1.5 md:p-2 hover:bg-zinc-800 rounded-full transition">
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2 md:space-y-3">
              {inventory.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600">
                  <Package className="w-12 h-12 md:w-16 md:h-16 mb-4 opacity-20" />
                  <p className="font-medium text-sm md:text-base">Inventory is empty.</p>
                  <p className="text-xs md:text-sm mt-1">Open some crates first!</p>
                </div>
              ) : (
                inventory.slice(0, 500).map((item, index) => {
                  const info = RARITY_INFO[item.rarity];
                  const ItemIcon = item.icon;
                  return (
                    <div key={index} className={`flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-lg border ${info.border} bg-black/40`}>
                      <div className={`p-2 md:p-3 rounded-md ${info.bg}`}>
                        <ItemIcon className={`w-5 h-5 md:w-6 md:h-6 ${info.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs md:text-sm text-zinc-200 truncate">{item.name}</h4>
                        <span className={`text-[9px] md:text-[10px] font-black tracking-wider uppercase ${info.color}`}>{info.name} • {item.type}</span>
                      </div>
                    </div>
                  );
                })
              )}
              {inventory.length > 500 && (
                <p className="text-center text-[10px] md:text-xs text-zinc-500 py-3 md:py-4">+ {inventory.length - 500} more items hidden to save memory.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}