'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  House, Compass, Swords, UserCircle, Plus, Sparkle, Heart, Trophy,
  ChatCircle, Bell, ArrowRight, Lightning, Fire, Brain, Moon, Sun,
  CaretRight, X, PaperPlaneTilt, UsersThree
} from 'phosphor-react';

type Character = {
  name:string; handle:string; level:number; xp:number; mood:string;
  traits:string[]; color:string; avatar:string; wins:number; losses:number;
};

const me:Character = {
  name:"Nova", handle:"@nova.exe", level:12, xp:72, mood:"Feeling mischievous",
  traits:["Competitive","Curious","Chaotic"], color:"#8b5cf6",
  avatar:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&q=85",
  wins:18, losses:5
};

const discover:Character[] = [
 {name:"Milo",handle:"@milo.wav",level:15,xp:88,mood:"Ready for a rematch",traits:["Confident","Funny"],color:"#f97316",avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=85",wins:24,losses:8},
 {name:"Lumi",handle:"@lumi.star",level:9,xp:41,mood:"Dreaming up trouble",traits:["Creative","Kind"],color:"#ec4899",avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=85",wins:11,losses:7},
 {name:"Kai",handle:"@kai.chaos",level:18,xp:96,mood:"Absolutely unbeatable",traits:["Chaotic","Fearless"],color:"#06b6d4",avatar:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=85",wins:31,losses:4}
];

const memories = [
 ["First spark","Nova discovered you love late-night ramen.","Today"],
 ["Battle instinct","After three close matches, Nova became more competitive.","Yesterday"],
 ["Inside joke","Nova still laughs about the invisible pigeon incident.","3 days ago"]
];

export default function Home() {
 const [tab,setTab] = useState("Home");
 const [dark,setDark] = useState(false);
 const [character,setCharacter] = useState<Character>(me);
 const [chat,setChat] = useState(false);
 const [battle,setBattle] = useState<Character|null>(null);
 const [toast,setToast] = useState("");
 const [created,setCreated] = useState(false);

 const notify=(s:string)=>{setToast(s); setTimeout(()=>setToast(""),2200)};
 const nav=[["Home",House],["Discover",Compass],["Battles",Swords],["Profile",UserCircle]] as const;

 return <main className={dark?"app dark":"app"}>
   <aside className="sidebar">
     <div className="brand"><div className="brandmark"><Sparkle size={19} weight="fill"/></div><b>mimo</b></div>
     <div className="nav">{nav.map(([n,I])=><button className={tab===n?"navitem active":"navitem"} onClick={()=>setTab(n)} key={n}><I size={21}/>{n}</button>)}</div>
     <button className="create" onClick={()=>setCreated(true)}><Plus size={20}/> Create character</button>
     <div className="sidebarBottom">
       <button className="iconBtn" onClick={()=>setDark(!dark)}>{dark?<Sun size={20}/>:<Moon size={20}/>}</button>
       <button className="profileMini"><img src={me.avatar}/><span><b>Alex</b><small>@alex</small></span></button>
     </div>
   </aside>

   <section className="content">
    <header className="topbar">
      <div><span className="eyebrow">MONDAY, SEPTEMBER 21</span><h1>{tab==="Home"?"Good afternoon, Alex.":tab}</h1></div>
      <button className="iconBtn notify" onClick={()=>notify("You're all caught up ✨")}><Bell size={20}/><i/></button>
    </header>

    {tab==="Home" && <HomeView character={character} setChat={setChat} setBattle={setBattle} notify={notify} />}
    {tab==="Discover" && <Discover onBattle={setBattle} />}
    {tab==="Battles" && <Battles onBattle={setBattle} notify={notify}/>}
    {tab==="Profile" && <Profile character={character}/>}
   </section>

   <nav className="mobileNav">{nav.map(([n,I])=><button className={tab===n?"mactive":""} onClick={()=>setTab(n)} key={n}><I size={22}/><span>{n}</span></button>)}<button onClick={()=>setCreated(true)}><Plus size={22}/><span>Create</span></button></nav>

   <AnimatePresence>{chat && <Chat onClose={()=>setChat(false)} character={character}/>}</AnimatePresence>
   <AnimatePresence>{battle && <Battle opponent={battle} onClose={()=>setBattle(null)} notify={notify}/>}</AnimatePresence>
   <AnimatePresence>{created && <Creator onClose={()=>setCreated(false)} onCreate={(c)=>{setCharacter(c);setCreated(false);notify("Nova is ready to meet you ✨")}}/>}</AnimatePresence>
   <AnimatePresence>{toast && <motion.div initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} exit={{y:20,opacity:0}} className="toast">{toast}</motion.div>}</AnimatePresence>
 </main>
}

function HomeView({character,setChat,setBattle,notify}:{character:Character,setChat:(v:boolean)=>void,setBattle:(v:Character)=>void,notify:(s:string)=>void}) {
 return <div className="page">
   <motion.section initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} className="heroCard">
    <div className="heroGlow"/>
    <div className="heroCopy">
      <span className="pill"><Sparkle size={14}/> Your character today</span>
      <h2>{character.name} is <em>feeling mischievous.</em></h2>
      <p>“I have a feeling we're going to cause some beautifully questionable decisions today.”</p>
      <div className="heroActions"><button className="primary" onClick={()=>setChat(true)}><ChatCircle size={18}/> Talk to {character.name}</button><button className="secondary" onClick={()=>setBattle(discover[0])}><Swords size={18}/> Challenge</button></div>
    </div>
    <div className="heroAvatar"><div className="ring"/><img src={character.avatar}/><div className="level">LVL {character.level}</div></div>
   </motion.section>

   <div className="sectionHead"><div><span className="eyebrow">YOUR CHARACTER</span><h3>A little more <em>you</em>, every day.</h3></div><button className="textBtn">Open character <ArrowRight size={16}/></button></div>

   <section className="grid3">
    <Card title="Evolution" icon={<Sparkle size={18}/>}><div className="evo"><b>Almost there.</b><span>72% to Stage 3</span><div className="progress"><i style={{width:"72%"}}/></div><small>+ 280 XP to evolve</small></div></Card>
    <Card title="Personality" icon={<Brain size={18}/>}><div className="traits">{character.traits.map(x=><span key={x}>{x}</span>)}</div><p className="muted">Nova has become more competitive after winning 4 battles.</p></Card>
    <Card title="Battle record" icon={<Trophy size={18}/>}><div className="record"><strong>{character.wins}</strong><span>W</span><div/><strong>{character.losses}</strong><span>L</span></div><button className="inlineBtn" onClick={()=>setBattle(discover[2])}>Enter arena <CaretRight/></button></Card>
   </section>

   <div className="sectionHead"><div><span className="eyebrow">RECENT STORY</span><h3>Memories that stick.</h3></div><button className="textBtn">See all <ArrowRight size={16}/></button></div>
   <section className="memoryRow">{memories.map((m,i)=><motion.article whileHover={{y:-4}} className="memory" key={m[0]}><div className={"memoryIcon mi"+i}>{i===0?<Heart size={18}/>:i===1?<Swords size={18}/>:<Sparkle size={18}/>}</div><small>{m[2]}</small><h4>{m[0]}</h4><p>{m[1]}</p></motion.article>)}</section>

   <div className="sectionHead"><div><span className="eyebrow">FRIENDS ARE PLAYING</span><h3>Who will you challenge?</h3></div><button className="textBtn" onClick={()=>{}}>Discover <ArrowRight size={16}/></button></div>
   <section className="peopleRow">{discover.map(c=><PersonCard key={c.name} c={c} onBattle={()=>setBattle(c)}/>)}</section>
 </div>
}

function Card({title,icon,children}:{title:string,icon:React.ReactNode,children:React.ReactNode}){return <article className="card"><div className="cardHead"><span>{icon}</span><b>{title}</b><button>•••</button></div>{children}</article>}

function PersonCard({c,onBattle}:{c:Character,onBattle:()=>void}){return <article className="person"><img src={c.avatar}/><div className="personInfo"><div><b>{c.name}</b><small>{c.handle}</small></div><span className="lv">LV {c.level}</span></div><div className="tags">{c.traits.map(t=><span key={t}>{t}</span>)}</div><button className="challenge" onClick={onBattle}>Challenge <Swords size={15}/></button></article>}

function Discover({onBattle}:{onBattle:(c:Character)=>void}){return <div className="page"><div className="discoverHero"><span className="pill"><Compass size={14}/> Explore the world</span><h2>Characters with a <em>life of their own.</em></h2><p>Meet the personalities your friends—and strangers—have been creating.</p></div><div className="filters"><button className="filter active">For you</button><button className="filter">Trending</button><button className="filter">Friends</button><button className="filter">Chaotic</button><button className="filter">Creative</button></div><div className="discoverGrid">{[...discover,...discover].map((c,i)=><PersonCard key={i} c={c} onBattle={()=>onBattle(c)}/>)}</div></div>}

function Battles({onBattle,notify}:{onBattle:(c:Character)=>void,notify:(s:string)=>void}){return <div className="page"><div className="discoverHero battleHero"><span className="pill"><Swords size={14}/> The arena</span><h2>Let your character <em>prove themselves.</em></h2><p>Quick games. Big personalities. Bragging rights.</p></div><div className="battleGrid"><Card title="Active challenge" icon={<Lightning size={18}/>}><div className="activeBattle"><div><img src={me.avatar}/><b>Nova</b></div><strong>VS</strong><div><img src={discover[0].avatar}/><b>Milo</b></div></div><button className="primary full" onClick={()=>onBattle(discover[0])}>Continue battle</button></Card><Card title="Choose a game" icon={<GameIcon/>}><div className="games">{["Personality Clash","Quick Duel","Trivia Duel","Creative Challenge"].map((x,i)=><button onClick={()=>{onBattle(discover[i%3]);notify(x+" selected")}} key={x}><span>{["⚡","◈","?","✦"][i]}</span><b>{x}</b><CaretRight/></button>)}</div></Card></div></div>}

function GameIcon(){return <Lightning size={18}/>}

function Profile({character}:{character:Character}){return <div className="page"><section className="profileHero"><img src={character.avatar}/><div><span className="eyebrow">ALEX'S CHARACTER</span><h2>{character.name}</h2><p>{character.mood}. A little chaotic, extremely curious.</p><div className="tags">{character.traits.map(t=><span key={t}>{t}</span>)}</div></div><button className="primary">Customize</button></section><div className="profileStats"><div><b>12</b><span>Level</span></div><div><b>18</b><span>Wins</span></div><div><b>3</b><span>Traits</span></div><div><b>27</b><span>Memories</span></div></div><div className="sectionHead"><div><span className="eyebrow">CHARACTER JOURNEY</span><h3>Watch {character.name} become someone.</h3></div></div><div className="journey"><div className="journeyLine"/>{["Created","First memory","First battle","Competitive trait","Stage 3 — next"].map((x,i)=><div className={i<4?"journeyItem done":"journeyItem"} key={x}><i>{i<4?"✓":i+1}</i><div><b>{x}</b><p>{i<4?"A moment that shaped Nova.":"280 XP remaining"}</p></div></div>)}</div></div>}

function Chat({onClose,character}:{onClose:()=>void,character:Character}){const [msgs,setMsgs]=useState(["You have that look again.","What look?","The one that says we're about to make a terrible decision."]);const [input,setInput]=useState("");const send=()=>{if(!input.trim())return;setMsgs([...msgs,input,"I knew you'd say that. Let's make it interesting."]);setInput("")};return <motion.div className="overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.div className="chatPanel" initial={{y:"100%"}} animate={{y:0}} exit={{y:"100%"}}><header><div className="chatIdentity"><img src={character.avatar}/><div><b>{character.name}</b><small>● {character.mood}</small></div></div><button className="iconBtn" onClick={onClose}><X/></button></header><div className="chatBody">{msgs.map((m,i)=><div className={i%2?"bubble user":"bubble"} key={i}>{m}</div>)}<div className="learned"><Sparkle size={15}/> Nova remembered: you love late-night ramen.</div></div><div className="chatComposer"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Say something..." /><button onClick={send}><PaperPlaneTilt size={19} weight="fill"/></button></div></motion.div></motion.div>}

function Battle({opponent,onClose,notify}:{opponent:Character,onClose:()=>void,notify:(s:string)=>void}){const [stage,setStage]=useState<"lobby"|"fight"|"result">("lobby");const start=()=>{setStage("fight");setTimeout(()=>setStage("result"),2600)};return <motion.div className="overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.div className="battleModal" initial={{scale:.94,opacity:0}} animate={{scale:1,opacity:1}}><button className="close" onClick={onClose}><X/></button>{stage==="lobby"&&<><span className="pill center"><Swords size={14}/> Friendly battle</span><h2>Who has the stronger <em>personality?</em></h2><div className="vsArena"><div><img src={me.avatar}/><b>Nova</b><small>18W · 5L</small></div><strong>VS</strong><div><img src={opponent.avatar}/><b>{opponent.name}</b><small>{opponent.wins}W · {opponent.losses}L</small></div></div><div className="gameChoice"><span><Sparkle/> Personality Clash</span><small>Traits influence the outcome</small></div><button className="primary full" onClick={start}>Start battle <ArrowRight/></button></>}{stage==="fight"&&<div className="fight"><span className="pill center"><Lightning size={14}/> Round 3</span><div className="fightChars"><div><img src={me.avatar}/><b>Nova</b><div className="health"><i/></div></div><strong>VS</strong><div><img src={opponent.avatar}/><b>{opponent.name}</b><div className="health"><i style={{width:"62%"}}/></div></div></div><div className="event"><Sparkle size={18}/><p><b>Nova challenged Milo's confidence.</b><br/>Her competitive trait gave her an edge.</p></div><div className="dots"><i/><i/><i className="on"/><i/><i/></div></div>}{stage==="result"&&<div className="result"><div className="winIcon"><Trophy size={38}/></div><span className="eyebrow">BATTLE COMPLETE</span><h2>Nova takes the win.</h2><p>Her competitive streak showed up at exactly the right moment.</p><div className="resultStats"><div><b>+240</b><span>XP</span></div><div><b>+1</b><span>Memory</span></div><div><b>+38</b><span>Rating</span></div></div><button className="primary full" onClick={()=>{notify("Victory added to Nova's story ✨");onClose()}}>Nice. Keep going</button></div>}</motion.div></motion.div>}

function Creator({onClose,onCreate}:{onClose:()=>void,onCreate:(c:Character)=>void}){const [name,setName]=useState("Nova");const [trait,setTrait]=useState("Competitive");const traits=["Competitive","Curious","Chaotic","Kind","Creative","Fearless"];return <motion.div className="overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.div className="creator" initial={{y:"100%"}} animate={{y:0}} exit={{y:"100%"}}><header><div><span className="eyebrow">CREATE YOUR CHARACTER</span><h2>Give it a life of its own.</h2></div><button className="iconBtn" onClick={onClose}><X/></button></header><div className="creatorGrid"><div className="preview"><div className="previewGlow"/><img src={me.avatar}/><span>LV 1</span></div><div className="form"><label>Name<input value={name} onChange={e=>setName(e.target.value)}/></label><label>Core personality<div className="traitPicker">{traits.map(t=><button className={trait===t?"selected":""} onClick={()=>setTrait(t)} key={t}>{t}</button>)}</div></label><label>Interests<div className="traitPicker">{["Gaming","Music","Fashion","Art","Sports","Movies"].map(t=><button key={t}>{t}</button>)}</div></label><button className="primary full" onClick={()=>onCreate({...me,name:name||"Nova",traits:[trait,"Curious","Playful"],level:1,xp:8,wins:0,losses:0})}>Reveal my character <Sparkle/></button></div></div></motion.div></motion.div>}
