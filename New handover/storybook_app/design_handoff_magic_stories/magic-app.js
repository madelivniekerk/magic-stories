/* ====== Magic Stories — app logic ====== */
(function(){
  'use strict';

  // ---------- builder definition ----------
  var STEPS = [
    {
      id:'level', accent:'pink', required:true, eyebrow:'First, a little about the reader',
      title:'How does your reader read?', prompt:'Pick a reading level — we tune the words, the sentences and the pace to fit.',
      type:'cards', cols:'cols-4',
      options:[
        {em:'🌱', lbl:'Foundation', sub:'Ages 5–6', val:'short, simple sentences', age:5},
        {em:'📖', lbl:'Early Reader', sub:'Ages 7–8', val:'easy, friendly sentences', age:7},
        {em:'🦉', lbl:'Confident', sub:'Ages 9–10', val:'richer sentences', age:9},
        {em:'🌟', lbl:'Advanced', sub:'Ages 11–12', val:'vivid, layered sentences', age:11}
      ]
    },
    {
      id:'words', accent:'gold', required:false, eyebrow:'Choose your word magic',
      title:'Pick your magic words', prompt:"Choose the writer's tools you'd like to practise today. We'll weave them through every page — and cheer you on to use them whenever you write.",
      type:'devices',
      options:[
        {id:'adj', em:'🎨', nm:'Adjectives', df:'Describing words that paint the picture.', minAge:5},
        {id:'sim', em:'🪞', nm:'Similes', df:'Compare two things using like or as.', minAge:7},
        {id:'per', em:'🌙', nm:'Personification', df:"Give feelings to things that aren't alive.", minAge:8},
        {id:'met', em:'🌌', nm:'Metaphors', df:'Say one thing simply is another.', minAge:9},
        {id:'adv', em:'🏃', nm:'Adverbs', df:'How something is done — use these sparingly!', minAge:9}
      ]
    },
    {
      id:'who', accent:'gold', required:true, eyebrow:'Question 1 · Who', q:'Who',
      title:'Who is our hero?', prompt:'Every great story needs a hero. Who will ours be today?',
      type:'cards', cols:'cols-5', own:'…or design your very own hero', ownPh:'e.g. a kind robot who loves to bake',
      more:{ prompt:"✏️ Tell me more about your hero — what do they look like, and what makes them special?",
        starters:['My hero looks…','They are really good at…','But they are a little afraid of…'],
        ph:'Write a sentence or two about your hero…' },
      options:[
        {em:'🦄', lbl:'Brave unicorn', val:'Luna the brave unicorn'},
        {em:'🦊', lbl:'Curious fox', val:'Pip the curious fox'},
        {em:'🐉', lbl:'Shy dragon', val:'Ember the shy dragon'},
        {em:'🧒', lbl:'A hero like me', val:'a brave young explorer just like you'},
        {em:'🐰', lbl:'Clever rabbit', val:'Sage the clever rabbit'},
        {em:'🦁', lbl:'Gentle lion', val:'Rumi the gentle lion'},
        {em:'🐙', lbl:'Octopus inventor', val:'Otto the octopus inventor'},
        {em:'🦋', lbl:'Brave butterfly', val:'Mira the brave butterfly'},
        {em:'🤖', lbl:'Friendly robot', val:'Bolt the friendly robot'},
        {em:'🐻', lbl:'Cuddly bear', val:'Bruno the brave bear'},
        {em:'🧚', lbl:'Tiny fairy', val:'Faye the tiny fairy'},
        {em:'🦕', lbl:'Baby dinosaur', val:'Dot the baby dinosaur'},
        {em:'🐢', lbl:'Wise turtle', val:'Tomo the wise turtle'},
        {em:'🦉', lbl:'Night owl', val:'Olwen the night owl'},
        {em:'🐼', lbl:'Kung-fu panda', val:'Bao the brave panda'},
        {em:'🦔', lbl:'Tiny hedgehog', val:'Quill the tiny hedgehog'},
        {em:'🐧', lbl:'Bold penguin', val:'Pim the bold penguin'},
        {em:'🦝', lbl:'Sneaky raccoon', val:'Roxy the clever raccoon'},
        {em:'🐝', lbl:'Busy bee', val:'Buzz the busy bee'},
        {em:'🧜', lbl:'Brave merchild', val:'Marina the brave merchild'}
      ]
    },
    {
      id:'where', accent:'lilac', required:true, eyebrow:'Question 2 · Where', q:'Where',
      title:'Where does it happen?', prompt:'Now, where in the wide world does our story take place?',
      type:'cards', cols:'cols-5', own:'…or invent a brand-new world', ownPh:'e.g. a city built on the back of a whale',
      more:{ prompt:"✏️ Paint this place — what would you see, hear, or smell there?",
        starters:['When you arrive, you can see…','It sounds like…','The air smells of…'],
        ph:'Describe this magical place…' },
      options:[
        {em:'🌳', lbl:'Enchanted forest', val:'a glowing enchanted forest'},
        {em:'🏰', lbl:'Sky castle', val:'a castle high in the clouds'},
        {em:'🌊', lbl:'Under the sea', val:'a kingdom deep beneath the waves'},
        {em:'🪐', lbl:'Faraway planet', val:'a planet far, far away'},
        {em:'🏜️', lbl:'Golden desert', val:'a vast golden desert'},
        {em:'❄️', lbl:'Frozen north', val:'the sparkling frozen north'},
        {em:'🍄', lbl:'Mushroom village', val:'a tiny mushroom village'},
        {em:'🌋', lbl:'Dragon mountains', val:'the smoking dragon mountains'},
        {em:'🏝️', lbl:'Secret island', val:'a hidden secret island'},
        {em:'🌌', lbl:'Among the stars', val:'high among the twinkling stars'},
        {em:'🎪', lbl:'Magical circus', val:'a magical travelling circus'},
        {em:'🕰️', lbl:'Land of clocks', val:'the curious land of clocks'},
        {em:'🍭', lbl:'Candy kingdom', val:'a sweet kingdom made of candy'},
        {em:'🏔️', lbl:'Tall mountains', val:'the tallest snowy mountains'},
        {em:'🦴', lbl:'Dinosaur valley', val:'a valley where dinosaurs still roam'},
        {em:'📚', lbl:'Living library', val:'a library where the books come alive'},
        {em:'🌧️', lbl:'Cloud city', val:'a floating city of rain and rainbows'},
        {em:'🕸️', lbl:'Spooky manor', val:'a friendly but spooky old manor'},
        {em:'🏞️', lbl:'Whispering valley', val:'a green valley of whispering streams'},
        {em:'🪺', lbl:'Treetop town', val:'a cosy town built in the treetops'}
      ]
    },
    {
      id:'when', accent:'purple', required:true, eyebrow:'Question 3 · When', q:'When',
      title:'When does our tale unfold?', prompt:'Stories can happen anytime at all. When does ours begin?',
      type:'cards', cols:'cols-5', own:'…or name your very own time', ownPh:'e.g. on the night the two moons kissed',
      more:{ prompt:"✏️ Set the scene — what is happening in the world at this moment?",
        starters:['At this time, the world is…','Everyone is busy…','But something feels different…'],
        ph:'Describe this moment in time…' },
      options:[
        {em:'⏳', lbl:'Long ago', val:'long, long ago'},
        {em:'🌙', lbl:'Moonlit night', val:'on one moonlit night'},
        {em:'🔮', lbl:'The future', val:'far in the future'},
        {em:'🌅', lbl:"Summer's day", val:'on the first warm day of summer'},
        {em:'🍂', lbl:'Autumn dusk', val:'on a crisp autumn evening'},
        {em:'⛈️', lbl:'A great storm', val:'in the middle of a great storm'},
        {em:'🎂', lbl:'On their birthday', val:'on their very own birthday'},
        {em:'🌫️', lbl:'At first light', val:'just as the morning mist lifted'},
        {em:'🎃', lbl:'Spooky season', val:'on a spooky autumn night'},
        {em:'🎄', lbl:'Deep midwinter', val:'in the heart of deep midwinter'},
        {em:'🌸', lbl:'First day of spring', val:'on the very first day of spring'},
        {em:'☀️', lbl:'Hottest day', val:'on the hottest day of the year'},
        {em:'🌠', lbl:'Night of shooting stars', val:'on the night the stars came falling'},
        {em:'🐓', lbl:'Break of dawn', val:'at the first crow of dawn'},
        {em:'🌃', lbl:'Stroke of midnight', val:'at the stroke of midnight'},
        {em:'🏖️', lbl:'Summer holidays', val:'during the long summer holidays'},
        {em:'🌊', lbl:'Low tide', val:'when the tide slipped far away'},
        {em:'🪄', lbl:'Once in a blue moon', val:'once in a rare blue moon'},
        {em:'🌁', lbl:'Festival night', val:'on the night of the great festival'},
        {em:'🍁', lbl:'Harvest time', val:'at the golden harvest time'}
      ]
    },
    {
      id:'what', accent:'green', required:true, eyebrow:'Question 4 · What', q:'What',
      title:"What's the quest?", prompt:'Here comes the exciting part — what must our hero do?',
      type:'cards', cols:'cols-5', own:'…or dream up your own quest', ownPh:'e.g. teach the grumpy giant to laugh',
      more:{ prompt:"✏️ What makes this quest tricky? What might go wrong along the way?",
        starters:['The hardest part will be…','Along the way, they meet…','To win, my hero must…'],
        ph:'Tell me about the adventure…' },
      options:[
        {em:'⭐', lbl:'Find the star', val:'find the missing star'},
        {em:'🗝️', lbl:'Secret door', val:'unlock a mysterious secret door'},
        {em:'🐣', lbl:'Rescue a friend', val:'rescue a lost little friend'},
        {em:'🧩', lbl:'Solve a riddle', val:'solve an ancient riddle'},
        {em:'🗺️', lbl:'Find treasure', val:'follow a map to hidden treasure'},
        {em:'🌈', lbl:'Bring back colour', val:'bring colour back to the world'},
        {em:'🌱', lbl:'Grow the magic seed', val:'plant and protect the last magic seed'},
        {em:'🕊️', lbl:'Make peace', val:'make peace between two old rivals'},
        {em:'🐲', lbl:'Tame a dragon', val:'tame a lonely dragon'},
        {em:'🎵', lbl:'Find the lost song', val:"find the world's lost song"},
        {em:'🌟', lbl:'Grant a wish', val:'grant a forgotten wish'},
        {em:'🌊', lbl:'Save the village', val:'save the village from a great wave'},
        {em:'🏆', lbl:'Win the great race', val:'win the great race against all odds'},
        {em:'👑', lbl:'Find the lost crown', val:'find the kingdom\'s lost crown'},
        {em:'🔦', lbl:'Explore the cave', val:'explore a deep and mysterious cave'},
        {em:'🧪', lbl:'Brew the cure', val:'brew the cure for a strange spell'},
        {em:'🌉', lbl:'Build a bridge', val:'build a bridge to a faraway land'},
        {em:'🦣', lbl:'Free the giant', val:'free a gentle giant from a trap'},
        {em:'❄️', lbl:'End the endless winter', val:'end a winter that would not end'},
        {em:'🪁', lbl:'Catch the runaway kite', val:'chase a magical runaway kite'}
      ]
    },
    {
      id:'why', accent:'pink', required:true, eyebrow:'Question 5 · Why', q:'Why',
      title:'And why does it matter?', prompt:'The best stories have heart. Why does this quest matter so much?',
      type:'cards', cols:'cols-5',
      more:{ prompt:"✏️ How does your hero FEEL about this? Why does it matter to them?",
        starters:['My hero feels…','It matters because…','Deep down, they hope…'],
        ph:'Write about why it matters…' },
      options:[
        {em:'🌌', lbl:'The sky went dark', val:'the night sky has gone dark'},
        {em:'❤️', lbl:'A friend needs help', val:'a dear friend is in trouble'},
        {em:'🤝', lbl:'A big promise', val:'of a promise they once made'},
        {em:'✨', lbl:'To find out who', val:'they long to discover who they truly are'},
        {em:'🏡', lbl:'To find a way home', val:'they are trying to find their way home'},
        {em:'😊', lbl:'To make someone smile', val:'they want to make someone they love smile again'},
        {em:'🌟', lbl:'To keep a wish alive', val:'a precious wish is starting to fade'},
        {em:'🐾', lbl:'To protect the animals', val:'the animals of the land need a champion'},
        {em:'🌍', lbl:'To save their home', val:'their whole world is in danger'},
        {em:'🦸', lbl:'To prove they can', val:'everyone said they were too small to try'},
        {em:'🧩', lbl:'To solve a mystery', val:'a puzzling mystery needs solving'},
        {em:'💔', lbl:'To mend a friendship', val:'two friends have fallen out'},
        {em:'🕯️', lbl:'To bring back hope', val:'the people have lost all hope'},
        {em:'🎁', lbl:'For a special someone', val:'they want to help someone very dear'},
        {em:'🦋', lbl:'To be brave at last', val:'they are learning to be brave'},
        {em:'📜', lbl:'To keep a secret safe', val:'an important secret must be protected'},
        {em:'⭐', lbl:'To follow a dream', val:'they are chasing a long-held dream'},
        {em:'🌷', lbl:'To make things grow again', val:'nothing in the land will grow'},
        {em:'🕊️', lbl:'To bring back peace', val:'a quarrel has upset the whole land'},
        {em:'📖', lbl:'To finish a story', val:'an old tale was never finished'}
      ]
    },
    {
      id:'touch', accent:'purple', required:false, eyebrow:'The finishing touch',
      title:'Add your magic touch', prompt:'Anything else to make it unmistakably theirs? A favourite colour, a pet, a funny detail. (Optional.)',
      type:'text', ph:'e.g. their best friend is a talking teapot named Doris…'
    },
    { id:'final', accent:'gold', final:true, eyebrow:'Ready for magic', title:'Your story is ready to be written!', prompt:"Here's everything we'll weave together:", type:'final' }
  ];

  // ---------- state ----------
  var state = { level:null, who:null, where:null, when:null, what:null, why:null, words:[], touch:'', more:{}, senses:{see:'',hear:'',feel:''} };
  var stepIndex = 0;
  var DEVLABEL = { adj:'Adjectives', adv:'Adverbs', sim:'Similes', met:'Metaphors', per:'Personification' };

  // ---------- helpers ----------
  function $(s, r){ return (r||document).querySelector(s); }
  function el(tag, cls, html){ var e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; }
  function show(id){
    document.querySelectorAll('.screen').forEach(function(s){ s.classList.toggle('active', s.id===id); });
    window.scrollTo(0,0);
  }

  // ---------- builder rendering ----------
  function renderTrail(){
    var trail = $('#trail'); trail.innerHTML='';
    var visible = STEPS.filter(function(s){ return !s.final; });
    visible.forEach(function(s, i){
      var node = el('div','node');
      if(i < stepIndex) node.classList.add('done');
      if(i === stepIndex) node.classList.add('current');
      var dot = el('div','dot', (i<stepIndex)?'✓':String(i+1));
      node.appendChild(dot);
      trail.appendChild(node);
      if(i < visible.length-1) trail.appendChild(el('span','seg'));
    });
  }

  function renderStep(){
    var step = STEPS[stepIndex];
    renderTrail();
    $('#step-count').textContent = step.final ? 'Final flourish' : ('Step ' + (stepIndex+1) + ' of ' + (STEPS.length-1));
    var panel = $('#step-panel');
    panel.setAttribute('data-accent', step.accent);
    panel.innerHTML='';
    panel.appendChild(el('p','eyebrow', step.eyebrow));
    panel.appendChild(el('h2', null, step.title));
    panel.appendChild(el('p','prompt', step.prompt));

    if(step.type==='cards'){ renderCards(panel, step); }
    else if(step.type==='devices'){ renderDevices(panel, step); }
    else if(step.type==='senses'){ renderSenses(panel, step); }
    else if(step.type==='text'){ renderText(panel, step); }
    else if(step.type==='final'){ renderFinal(panel); }

    renderNav(step);
  }

  function renderCards(panel, step){
    var grid = el('div','opt-grid '+(step.cols||'cols-5'));
    step.options.forEach(function(o){
      var card = el('button','opt'+(step.id==='level'?' level':''));
      card.type='button';
      card.innerHTML = '<span class="em">'+o.em+'</span><span class="lbl">'+o.lbl+'</span>'+(o.sub?'<span class="sub">'+o.sub+'</span>':'');
      if(state[step.id] && state[step.id].val===o.val && !state[step.id].custom) card.classList.add('sel');
      card.addEventListener('click', function(){
        state[step.id] = { label:o.lbl, val:o.val, custom:false, age:o.age };
        renderStep();
      });
      grid.appendChild(card);
    });
    panel.appendChild(grid);

    if(step.own){
      var row = el('div','own-row');
      var toggle = el('button','own-toggle','✦ '+step.own);
      toggle.type='button';
      var field = el('div','own-field');
      var input = el('input','txt'); input.type='text'; input.placeholder=step.ownPh||'Describe your idea…';
      if(state[step.id] && state[step.id].custom){ field.classList.add('show'); input.value=state[step.id].val; }
      input.addEventListener('input', function(){
        var v=input.value.trim();
        if(v){ state[step.id]={ label:'Your own', val:v, custom:true };
          grid.querySelectorAll('.opt').forEach(function(c){ c.classList.remove('sel'); });
        } else if(state[step.id] && state[step.id].custom){ state[step.id]=null; }
        updateNavState(step);
      });
      toggle.addEventListener('click', function(){ field.classList.toggle('show'); if(field.classList.contains('show')) input.focus(); });
      field.appendChild(input);
      row.appendChild(toggle); row.appendChild(field);
      panel.appendChild(row);
    }

    if(step.more){ panel.appendChild(makeWriteBlock(step.id, step.more)); }
  }

  // word-count helpers (encourage typing)
  function countWords(s){ s=(s||'').trim(); return s ? s.split(/\s+/).length : 0; }
  function sparkMsg(n){
    if(n===0) return '✏️ Your turn — add a sentence or two of your own!';
    if(n<5) return '✨ Great start — keep going!';
    if(n<15) return '✨ '+n+' magic words! You\'re really writing now!';
    return '🌟 Wow — '+n+' words! What an imagination!';
  }
  function sparkLevel(n){ return n===0?0 : n<5?1 : n<15?2 : 3; }

  function magicReminder(){
    if(!state.words.length) return null;
    var names = state.words.map(function(w){return DEVLABEL[w];}).join(', ');
    return el('p','magic-reminder','✨ Your magic words: '+names+' — try sneaking one into your writing!');
  }

  function makeWriteBlock(stepId, cfg){
    var wrap = el('div','write-block');
    wrap.appendChild(el('p','wb-head', cfg.prompt));
    var mr = magicReminder(); if(mr) wrap.appendChild(mr);
    var ta = el('textarea','txt'); ta.placeholder=cfg.ph||'Write here…'; ta.value=state.more[stepId]||'';
    var spark = el('p','spark-meter');
    function refresh(){ var n=countWords(ta.value); spark.className='spark-meter lvl'+sparkLevel(n); spark.textContent=sparkMsg(n); }
    if(cfg.starters && cfg.starters.length){
      var chips = el('div','starter-chips');
      cfg.starters.forEach(function(st){
        var c = el('button','starter','＋ '+st); c.type='button';
        c.addEventListener('click', function(){
          var cur = ta.value.replace(/\s+$/,'');
          ta.value = (cur ? cur+' ' : '') + st + ' ';
          state.more[stepId]=ta.value; ta.focus(); refresh();
        });
        chips.appendChild(c);
      });
      wrap.appendChild(chips);
    }
    ta.addEventListener('input', function(){ state.more[stepId]=ta.value; refresh(); });
    wrap.appendChild(ta); wrap.appendChild(spark); refresh();
    return wrap;
  }

  function renderSenses(panel, step){
    var mr = magicReminder(); if(mr) panel.appendChild(mr);
    var grid = el('div','senses-grid');
    var defs = [
      {k:'see', em:'👀', lbl:'I can SEE…', ph:'e.g. tall golden trees'},
      {k:'hear', em:'👂', lbl:'I can HEAR…', ph:'e.g. birds singing softly'},
      {k:'feel', em:'🖐️', lbl:'I can FEEL or SMELL…', ph:'e.g. warm, sweet air'}
    ];
    var spark = el('p','spark-meter');
    function refresh(){ var n=countWords(state.senses.see)+countWords(state.senses.hear)+countWords(state.senses.feel);
      spark.className='spark-meter lvl'+sparkLevel(n); spark.textContent = n===0 ? '✏️ Add a few words for each — paint the scene!' : sparkMsg(n); }
    defs.forEach(function(d){
      var cell = el('div','sense');
      cell.appendChild(el('div','sh','<span class="em">'+d.em+'</span>'+d.lbl));
      var inp = el('input','txt'); inp.type='text'; inp.placeholder=d.ph; inp.value=state.senses[d.k]||'';
      inp.addEventListener('input', function(){ state.senses[d.k]=inp.value; refresh(); });
      cell.appendChild(inp); grid.appendChild(cell);
    });
    panel.appendChild(grid); panel.appendChild(spark); refresh();
    panel.appendChild(el('p','field-hint','Optional — but these little details make a story shine.'));
  }

  function renderDevices(panel, step){
    var childAge = (state.level && state.level.age) || 5;
    // keep only tools unlocked at this reader's age
    state.words = state.words.filter(function(id){
      var o = step.options.filter(function(x){return x.id===id;})[0];
      return o && (o.minAge||5) <= childAge;
    });
    var list = el('div','devs');
    step.options.forEach(function(o){
      var locked = (o.minAge||5) > childAge;
      var b = el('button','dev'+(locked?' locked':'')); b.type='button';
      if(!locked && state.words.indexOf(o.id)>=0) b.classList.add('on');
      var right = locked ? '<span class="lock">🔒 Age '+o.minAge+'+</span>' : '<span class="tg">✓</span>';
      b.innerHTML = '<span class="em">'+o.em+'</span><span class="body"><span class="nm">'+o.nm+'</span><span class="df">'+o.df+'</span></span>'+right;
      if(!locked){
        b.addEventListener('click', function(){
          var i=state.words.indexOf(o.id);
          if(i>=0) state.words.splice(i,1); else state.words.push(o.id);
          b.classList.toggle('on');
          updateDevPreview();
        });
      }
      list.appendChild(b);
    });
    panel.appendChild(list);
    panel.appendChild(el('p','field-hint','✨ Start with a few — more tools unlock as readers grow up. Locked ones show the age they appear.'));
    var pv = el('div','dev-preview');
    pv.innerHTML = '<span class="dp-label">✦ Watch the sentence grow</span><p class="dp-text" id="dp-text"></p>';
    panel.appendChild(pv);
    updateDevPreview();
  }

  function updateDevPreview(){
    var out = $('#dp-text'); if(!out) return;
    var on = state.words;
    function W(c,t){ return '<span class="w '+c+'">'+t+'</span>'; }
    var adj1 = on.indexOf('adj')>=0 ? W('adj','emerald')+' ' : '';
    var adj2 = on.indexOf('adj')>=0 ? W('adj','rolling')+' ' : '';
    var adv  = on.indexOf('adv')>=0 ? W('adv','silently')+' ' : '';
    var s = 'The '+adj1+'dragon flew '+adv+'over the '+adj2+'hills';
    if(on.indexOf('sim')>=0) s += ', '+W('sim','like a whisper on the wind');
    s += '.';
    if(on.indexOf('met')>=0) s += ' '+W('met','The sky was a velvet blanket above.');
    if(on.indexOf('per')>=0) s += ' '+W('per','The moon watched, and the stars whispered back.');
    out.innerHTML = s;
  }

  function renderText(panel, step){
    var ta = el('textarea','txt'); ta.placeholder=step.ph||''; ta.value=state.touch||'';
    ta.addEventListener('input', function(){ state.touch=ta.value; });
    panel.appendChild(ta);
    panel.appendChild(el('p','field-hint','This step is optional — leave it blank if you like.'));
  }

  function renderFinal(panel){
    var recap = el('div','recap');
    function chip(k,v){ if(v) recap.appendChild(el('span','rc','<b>'+k+'</b> '+v)); }
    chip('Reader', state.level && state.level.label);
    chip('Who', state.who && state.who.val);
    chip('Where', state.where && state.where.val);
    chip('When', state.when && state.when.val);
    chip('What', state.what && state.what.val);
    chip('Why', state.why && state.why.val);
    if(state.words.length) chip('Magic words', state.words.map(function(w){return DEVLABEL[w];}).join(', '));
    if(state.touch) chip('Magic touch', state.touch);
    var own = countWords(state.more.who)+countWords(state.more.where)+countWords(state.more.what)+countWords(state.more.why)
            + countWords(state.senses.see)+countWords(state.senses.hear)+countWords(state.senses.feel)+countWords(state.touch);
    panel.appendChild(recap);
    if(own>0){
      var badge = el('p','spark-meter lvl3'); badge.style.marginTop='16px'; badge.style.fontSize='15px';
      badge.textContent = '🌟 You wrote '+own+' of your very own words — a true storyteller!';
      panel.appendChild(badge);
    }
  }

  // ---------- nav ----------
  function renderNav(step){
    var nav = $('#builder-nav'); nav.innerHTML='';
    var back = el('button','btn btn-ghost', '← Back'); back.type='button';
    back.disabled = stepIndex===0;
    back.addEventListener('click', function(){ if(stepIndex>0){ stepIndex--; renderStep(); } });
    nav.appendChild(back);
    nav.appendChild(el('div','spacer'));

    if(step.final){
      var write = el('button','btn btn-gold btn-lg','✦ Write My Story! ✦'); write.type='button';
      write.addEventListener('click', startWriting);
      nav.appendChild(write);
      return;
    }
    if(!step.required){
      var skip = el('button','skip-link', step.id==='words'?'Skip — no extra words':'Skip this step'); skip.type='button';
      skip.addEventListener('click', function(){ stepIndex++; renderStep(); });
      nav.appendChild(skip);
    }
    var next = el('button','btn btn-primary', 'Next →'); next.type='button'; next.id='next-btn';
    next.addEventListener('click', function(){
      if(COACH_STEPS[step.id] && !coached[step.id]){ coached[step.id]=true; showCoach(step); return; }
      if(stepIndex<STEPS.length-1){ stepIndex++; renderStep(); }
    });
    nav.appendChild(next);
    updateNavState(step);
  }

  // ---------- coach: context-aware elaboration prompts (different per page) ----------
  var coached = {};
  var COACH_STEPS = { who:1, where:1, when:1, what:1, why:1 };

  // per-page coaching: senses only for place (where) & action (what);
  // adjective offered when a noun is present, adverb when a verb is present.
  var COACH = {
    who:   { spark:'🦸', intro:'Let’s bring your hero to life!',
             adj:true, adv:false, senses:false,
             custom:{ tag:'idea', q:'What is your hero really good at — or a little afraid of?',
                      ph:'e.g. brilliant at climbing, but scared of the dark',
                      make:function(v){ return cap(heroName())+' was '+v+'.'; } } },
    where: { spark:'🎨', intro:'Let’s paint this place so we can SEE it!',
             adj:true, adv:false, senses:true },
    when:  { spark:'🌗', intro:'Let’s set the scene — what is it like right now?',
             adj:true, adv:false, senses:false,
             custom:{ tag:'describe', q:'Is it light or dark? What is the weather doing?',
                      ph:'e.g. dark and stormy, bright and frosty',
                      make:function(v){ return cap(v)+'.'; } } },
    what:  { spark:'⚡', intro:'Let’s feel the action!',
             adj:false, adv:true, senses:true },
    why:   { spark:'❤️', intro:'Let’s reach the heart of the story.',
             adj:false, adv:false, senses:false,
             custom:{ tag:'feeling', q:'How does your hero FEEL about this?',
                      ph:'e.g. worried, but braver than ever',
                      make:function(v){ return cap(heroName())+' felt '+v+'.'; } } }
  };

  function isStop(w){ return /^(the|a|an|and|but|in|on|at|to|of|is|was|were|with|my|their|her|his|its|they|he|she|it|for|from|by|as|so|that|this|into|onto|over|under|up|down|out|are|be|been|had|has|have|will|would|could|can|do|does|did|then|when|where|what|who|why|how|there|here|very|really|just|some|any|all|one|two|hero|story|about|near|behind|inside)$/.test(w); }
  var COMMON_VERBS = /^(hide|hides|hid|run|runs|ran|jump|jumps|jumped|fly|flies|flew|swim|swims|swam|climb|climbs|climbed|walk|walks|walked|look|looks|looked|find|finds|found|search|searches|hold|holds|held|fight|fights|sing|sings|sang|dance|dances|danced|sleep|sleeps|eat|eats|ate|dream|dreams|fall|falls|fell|ride|rides|rode|sail|sails|dig|digs|leap|leaps|race|races|chase|chases|escape|escapes|hop|hops|sneak|sneaks|creep|creeps|crept|dash|dashes|explore|explores|discover|discovers|grab|grabs|throw|throws|threw|catch|catches|build|builds|wander|wanders|float|floats|glide|glides|march|marches|rush|rushes|tiptoe|tiptoes|gallop|gallops|crawl|crawls|skip|skips|whisper|whispers|shout|shouts|laugh|laughs|cry|cries)$/;
  function pickWord(text){
    var ws = (text||'').toLowerCase().replace(/[^a-z\s]/g,' ').split(/\s+/).filter(Boolean);
    for(var i=ws.length-1;i>=0;i--){ if(!isStop(ws[i]) && !COMMON_VERBS.test(ws[i]) && ws[i].length>2) return ws[i]; }
    return '';
  }
  function findVerb(text){
    var ws = (text||'').toLowerCase().replace(/[^a-z\s]/g,' ').split(/\s+/).filter(Boolean);
    for(var i=0;i<ws.length;i++){ if(COMMON_VERBS.test(ws[i])) return ws[i]; }
    for(var j=0;j<ws.length;j++){ if(!isStop(ws[j]) && /(ing|ed)$/.test(ws[j]) && ws[j].length>4) return ws[j]; }
    return '';
  }
  function addField(card, tag, q, ph){
    var f = el('div','coach-field');
    f.innerHTML = '<label><span class="tag">'+tag+'</span> '+q+'</label>';
    var inp = el('input','txt'); inp.type='text'; inp.placeholder=ph;
    f.appendChild(inp); card.appendChild(f); return inp;
  }

  function showCoach(step){
    var cfg = COACH[step.id] || {};
    var text = state.more[step.id] || '';
    var word = pickWord(text);
    var verb = findVerb(text);
    var ov = el('div','coach-overlay');
    var card = el('div','coach-card');
    card.appendChild(el('span','coach-spark', cfg.spark || '🧚'));
    card.appendChild(el('h3','coach-title', cfg.intro || 'Let’s add a little more magic!'));

    // one adaptive subline
    var sub;
    if(!text.trim()) sub = 'You can write your own words here — even a few make the story sparkle.';
    else if(cfg.adj && word) sub = 'You wrote about a <b>'+escapeHtml(word)+'</b> — let’s describe it!';
    else if(cfg.adv && verb) sub = 'Your hero <b>'+escapeHtml(verb)+'</b> — let’s show us HOW!';
    else sub = 'Let’s add a tiny detail to make it shine.';
    card.appendChild(el('p','coach-line', sub));

    var fields = [];

    // custom per-page question (feelings, weather, hero trait…)
    if(cfg.custom){
      var ci = addField(card, cfg.custom.tag, cfg.custom.q, cfg.custom.ph);
      fields.push({ inp:ci, make:cfg.custom.make });
    }
    // adjective — only when a noun is present in their writing
    if(cfg.adj && word){
      var ai = addField(card, 'adjective', 'What KIND of '+escapeHtml(word)+' is it?', 'e.g. a prickly '+word+', a giant '+word+'…');
      fields.push({ inp:ai, make:function(v){ return 'The '+word+' was '+v+'.'; } });
    }
    // adverb — only when a verb is present (the action page especially)
    if(cfg.adv && verb){
      var dv = addField(card, 'adverb', 'HOW did they '+escapeHtml(verb)+'? (a -ly word)', 'e.g. bravely, quietly, quickly');
      fields.push({ inp:dv, make:function(v){ return cap(heroName())+' did it '+v+'.'; } });
    }
    // senses — only for place (where) & action (what)
    if(cfg.senses){
      var si = addField(card, 'see', 'What can your hero SEE here?', 'e.g. golden sunlight through the leaves');
      var hi = addField(card, 'hear & smell', 'What can they HEAR or SMELL?', 'e.g. birds singing, sweet flowers');
      fields.push({ inp:si, make:function(v){ return cap(heroName())+' could see '+v+'.'; } });
      fields.push({ inp:hi, make:function(v){ return 'They could hear and smell '+v+'.'; } });
    }
    // fallback: if nothing contextual surfaced, offer one friendly open field
    if(!fields.length){
      var fi = addField(card, 'add more', 'Add one more sentence of your own', 'Tell us what happens next…');
      fields.push({ inp:fi, make:function(v){ return cap(v)+'.'; } });
    }

    var actions = el('div','coach-actions');
    var skip = el('button','coach-skip','Maybe later →'); skip.type='button';
    var add = el('button','btn btn-gold','✨ Add to my story'); add.type='button';
    actions.appendChild(skip); actions.appendChild(add);
    card.appendChild(actions);
    ov.appendChild(card); document.body.appendChild(ov);
    setTimeout(function(){ if(fields[0]) fields[0].inp.focus(); }, 60);

    function clean(v){ return (v||'').trim().replace(/[.!?]+$/,''); }
    function advance(){ ov.remove(); if(stepIndex<STEPS.length-1){ stepIndex++; renderStep(); } }
    add.addEventListener('click', function(){
      var extra = [];
      fields.forEach(function(f){ var v=clean(f.inp.value); if(v) extra.push(f.make(v)); });
      if(extra.length){
        var cur = (state.more[step.id]||'').replace(/\s+$/,'');
        if(cur && !/[.!?…]$/.test(cur)) cur += '.';
        state.more[step.id] = (cur ? cur+' ' : '') + extra.join(' ');
      }
      advance();
    });
    skip.addEventListener('click', advance);
    ov.addEventListener('click', function(e){ if(e.target===ov) advance(); });
  }

  function updateNavState(step){
    var next = $('#next-btn'); if(!next) return;
    if(step.required) next.disabled = !state[step.id];
  }

  // ---------- story assembly ----------
  function cap(s){ return s ? s.charAt(0).toUpperCase()+s.slice(1) : s; }
  function heroName(){ var v=state.who.val; return v.split(' ')[0]; }
  function W(c,t){ return state.words.indexOf(c)>=0 ? '<span class="w '+c+'">'+t+'</span>' : t.replace(/^[a-z]/, function(m){return m;}); }
  // word-magic helpers: only apply if the device is on
  function adj(word, plain){ return state.words.indexOf('adj')>=0 ? '<span class="w adj">'+word+'</span> '+plain : plain; }
  function adv(plain, word){ return state.words.indexOf('adv')>=0 ? plain+' <span class="w adv">'+word+'</span>' : plain; }
  function simile(text){ return state.words.indexOf('sim')>=0 ? ' <span class="w sim">'+text+'</span>' : ''; }
  function metaphor(text){ return state.words.indexOf('met')>=0 ? ' <span class="w met">'+text+'</span>' : ''; }
  function person(text){ return state.words.indexOf('per')>=0 ? ' <span class="w per">'+text+'</span>' : ''; }

  function ownText(s){ s=(s||'').trim(); if(!s) return ''; s=s.charAt(0).toUpperCase()+s.slice(1); if(!/[.!?…]$/.test(s)) s+='.'; return s; }
  function sensesLine(){
    var s=state.senses, parts=[];
    function clean(v){ return v.trim().replace(/[.!?]+$/,''); }
    if(s.see && s.see.trim()) parts.push('see '+clean(s.see));
    if(s.hear && s.hear.trim()) parts.push('hear '+clean(s.hear));
    if(s.feel && s.feel.trim()) parts.push('feel '+clean(s.feel));
    if(!parts.length) return '';
    var joined = parts.length===1 ? parts[0] : parts.slice(0,-1).join(', ')+' and '+parts[parts.length-1];
    return ' '+cap(heroName())+' could '+joined+'.';
  }

  function buildStory(){
    var hero = state.who.val, where=state.where.val, when=state.when.val, what=state.what.val, why=state.why.val;
    var name = heroName();
    var touch = state.touch ? (' '+cap(state.touch.replace(/\.$/,''))+'.') : '';
    var mWho = state.more.who ? (' '+ownText(state.more.who)) : '';
    var mWhere = state.more.where ? (' '+ownText(state.more.where)) : '';
    var mWhat = state.more.what ? (' '+ownText(state.more.what)) : '';
    var mWhy = state.more.why ? (' '+ownText(state.more.why)+' ') : '';
    var pages = [
      {
        scene:'🌅 The journey begins', emoji:'🌅',
        text: cap(when)+', in '+where+', there lived '+hero+'.'+ mWho +
              simile(' Their heart was as bright as a morning sun.')+touch
      },
      {
        scene:'❓ A call to adventure', emoji:'🧭',
        text: 'One day, '+name+' learned that '+why+'. '+ mWhy +
              cap(adj('brave', 'and true')) +', they knew they must '+what+'.'+
              metaphor(' The quest was a door, and it had just swung open.')
      },
      {
        scene:'🌲 Into the unknown', emoji:'🌲',
        text: 'So '+name+' set off through '+where+'.'+ sensesLine() + mWhere +
              ' The path twisted and turned'+adv('', 'endlessly')+'.'+
              person(' The trees leaned close and whispered, "Be brave."')
      },
      {
        scene:'⚡ The big challenge', emoji:'⚡',
        text: 'But the way was not easy. A '+adj('towering','')+'challenge rose up to stop them'+
              simile(', like a mountain made of doubt')+'.'+ mWhat + ' '+
              cap(name)+' took a deep breath and did not turn back.'
      },
      {
        scene:'💛 A clever heart wins', emoji:'💡',
        text: 'With a clever idea and a kind heart, '+name+' found a way. '+
              'At last, they managed to '+what+'!'+
              metaphor(' Hope was a candle, and it burned bright again.')
      },
      {
        scene:'🏡 Home, and changed', emoji:'🌟',
        text: 'And so '+why.replace(/^they\s/,'') + ' was put right. '+
              cap(name)+' returned home'+adv('', 'proudly')+', knowing that even the smallest hero can do '+adj('wonderful','')+'things.'
      }
    ];
    return { title: makeTitle(), hero: hero, pages: pages };
  }

  function makeTitle(){
    var name = heroName();
    var map = {
      'find the missing star':'and the Missing Star',
      'unlock a mysterious secret door':'and the Secret Door',
      'rescue a lost little friend':'and the Lost Friend',
      'solve an ancient riddle':'and the Ancient Riddle',
      'follow a map to hidden treasure':'and the Hidden Treasure',
      'bring colour back to the world':'and the Colour Thief',
      'plant and protect the last magic seed':'and the Last Magic Seed',
      'make peace between two old rivals':'and the Great Peace'
    };
    var suffix = map[state.what.val] || "'s Great Adventure";
    return cap(name) + ' ' + suffix;
  }

  // ---------- flow: writing / loading ----------
  var LOAD_MSGS = [
    'The story fairies are dipping their quills…',
    'Sketching your hero…',
    'Painting the world in watercolour…',
    'Sprinkling in a little magic…',
    'Binding the pages with golden thread…',
    'Almost ready — shh, it\'s nearly done…'
  ];
  var currentStory = null;

  function startWriting(){
    currentStory = buildStory();
    show('screen-loading');
    var fill = $('#load-fill'); var msg = $('#load-msg');
    var p=0, mi=0; fill.style.width='0%'; msg.textContent=LOAD_MSGS[0];
    var iv = setInterval(function(){
      p += 7 + Math.random()*10;
      if(p>100) p=100;
      fill.style.width = p+'%';
      var idx = Math.min(LOAD_MSGS.length-1, Math.floor(p/100*LOAD_MSGS.length));
      if(idx!==mi){ mi=idx; msg.textContent=LOAD_MSGS[idx]; }
      if(p>=100){ clearInterval(iv); setTimeout(buildCoverAndShow, 650); }
    }, 480);
  }

  // ---------- cover + pages ----------
  function buildCoverAndShow(){
    var cov = $('#cover-spread');
    cov.innerHTML =
      '<div class="page illo"><img src="assets/illo-jungle.png" alt="cover illustration" /></div>'+
      '<div class="spine"></div>'+
      '<div class="page cover-r">'+
        '<span class="cover-twinkle" style="top:14%;left:18%">✦</span>'+
        '<span class="cover-twinkle" style="top:22%;right:16%;animation-delay:.8s">✦</span>'+
        '<span class="cover-twinkle" style="bottom:18%;left:24%;animation-delay:1.4s">✦</span>'+
        '<div class="ornament">✦ ❖ ✦</div>'+
        '<h2 class="ctitle">'+currentStory.title+'</h2>'+
        '<div class="cby">a magic story for <b>'+escapeHtml(displayReader())+'</b></div>'+
      '</div>';
    show('screen-cover');
  }
  function displayReader(){ return state.level ? state.level.label.toLowerCase()+' readers' : 'you'; }
  function escapeHtml(s){ return (s||'').replace(/[&<>"]/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }

  var pageIndex = 0;
  function openBook(){ pageIndex=0; renderPage(); show('screen-pages'); }

  function renderPage(){
    var pg = currentStory.pages[pageIndex];
    var spread = $('#story-spread');
    var illo = pageIndex===0
      ? '<img src="assets/illo-jungle.png" alt="illustration" />'
      : '<div class="scene"><span class="big">'+pg.emoji+'</span><span class="cap">'+pg.scene+'</span></div>';
    var dropLetter = pg.text.replace(/<[^>]+>/g,'').charAt(0);
    var bodyHtml = '<span class="drop">'+dropLetter+'</span>'+pg.text.replace(/^<[^>]+>?/, '').replace(/^./, '');
    // simpler: drop cap then full text minus first char
    var plainFirst = pg.text.charAt(0);
    bodyHtml = '<span class="drop">'+plainFirst+'</span>'+pg.text.slice(1);
    spread.innerHTML =
      '<div class="page illo">'+illo+'</div>'+
      '<div class="spine"></div>'+
      '<div class="page parch">'+
        '<div class="runhead">'+escapeHtml(currentStory.title)+'</div>'+
        '<div class="story-body"><p>'+bodyHtml+'</p></div>'+
        '<div class="pagenum"><span class="gem">✦</span> '+(pageIndex+1)+' <span class="gem">✦</span></div>'+
      '</div>';
    // dots
    var dots = $('#page-dots'); dots.innerHTML='';
    currentStory.pages.forEach(function(_,i){
      var d=el('span','pd'+(i===pageIndex?' on':''));
      d.addEventListener('click', function(){ pageIndex=i; renderPage(); });
      dots.appendChild(d);
    });
    $('#prev-page').disabled = pageIndex===0;
    $('#next-page').innerHTML = pageIndex===currentStory.pages.length-1 ? '✦' : '→';
    // close any open tools
    $('#edit-pop').classList.remove('show'); $('#repaint-pop').classList.remove('show');
    var et=$('#edit-text'); if(et) et.value = currentStory.pages[pageIndex].text.replace(/<[^>]+>/g,'');
  }

  function nextPage(){
    if(pageIndex < currentStory.pages.length-1){ pageIndex++; renderPage(); }
    else { show('screen-end'); }
  }
  function prevPage(){ if(pageIndex>0){ pageIndex--; renderPage(); } }

  // ---------- library ----------
  var LIB_KEY = 'magicStories.library.v1';
  function loadLib(){ try{ return JSON.parse(localStorage.getItem(LIB_KEY))||[]; }catch(e){ return []; } }
  function saveLib(list){ try{ localStorage.setItem(LIB_KEY, JSON.stringify(list)); }catch(e){} }
  function seedLib(){
    var lib = loadLib();
    if(lib.length===0){
      lib = [
        { title:'Pip and the Secret Door', meta:'Confident reader · 6 pages', cover:'assets/illo-jungle.png' },
        { title:'Luna and the Missing Star', meta:'Early reader · 6 pages', emoji:'⭐' }
      ];
      saveLib(lib);
    }
  }
  function saveCurrentToLib(){
    var lib = loadLib();
    lib.unshift({ title:currentStory.title, meta:(state.level?state.level.label:'')+' reader · 6 pages', cover:'assets/illo-jungle.png' });
    saveLib(lib);
    renderLibrary();
    show('screen-library');
  }
  function renderLibrary(){
    var grid = $('#lib-grid'); var lib = loadLib(); grid.innerHTML='';
    if(lib.length===0){ grid.innerHTML='<p class="lib-empty">No stories yet — go make your first one! ✦</p>'; return; }
    lib.forEach(function(s){
      var card = el('div','lib-card');
      var thumb = s.cover ? '<div class="lib-thumb"><img src="'+s.cover+'" alt=""></div>'
                          : '<div class="lib-thumb"><div class="ph">'+(s.emoji||'📖')+'</div></div>';
      card.innerHTML = thumb + '<div class="lib-body"><div class="lt">'+escapeHtml(s.title)+'</div><div class="lm">'+escapeHtml(s.meta||'')+'</div></div>';
      grid.appendChild(card);
    });
  }

  // ---------- reset ----------
  function newStory(){
    state = { level:null, who:null, where:null, when:null, what:null, why:null, words:[], touch:'', more:{}, senses:{see:'',hear:'',feel:''} };
    coached = {};
    stepIndex = 0; renderStep(); show('screen-builder');
  }

  // ---------- wire up ----------
  document.addEventListener('DOMContentLoaded', function(){
    seedLib();
    renderStep();
    $('#open-book').addEventListener('click', openBook);
    $('#prev-page').addEventListener('click', prevPage);
    $('#next-page').addEventListener('click', nextPage);
    $('#brand-home').addEventListener('click', function(){ show('screen-builder'); });
    $('#lib-btn').addEventListener('click', function(){ renderLibrary(); show('screen-library'); });
    $('#lib-new').addEventListener('click', newStory);
    $('#end-new').addEventListener('click', newStory);
    $('#end-save').addEventListener('click', saveCurrentToLib);
    $('#end-pdf').addEventListener('click', function(){ window.print(); });
    // page tools
    $('#edit-toggle').addEventListener('click', function(){ $('#edit-pop').classList.toggle('show'); $('#repaint-pop').classList.remove('show'); });
    $('#repaint-toggle').addEventListener('click', function(){ $('#repaint-pop').classList.toggle('show'); $('#edit-pop').classList.remove('show'); });
    $('#edit-save').addEventListener('click', function(){
      var v=$('#edit-text').value.trim(); if(v){ currentStory.pages[pageIndex].text=v; renderPage(); }
    });
    $('#repaint-go').addEventListener('click', function(){
      var btn=$('#repaint-go'); btn.disabled=true; btn.textContent='Repainting…';
      setTimeout(function(){ btn.disabled=false; btn.textContent='✦ Repaint this page'; $('#repaint-pop').classList.remove('show'); }, 1400);
    });
    show('screen-builder');
    // test hook (harmless): lets verification jump straight to a built book
    window.__magic = {
      quickFinish: function(){
        if(!state.level) state.level={label:'Confident',val:'richer sentences'};
        if(!state.who) state.who={label:'Brave unicorn',val:'Luna the brave unicorn',custom:false};
        if(!state.where) state.where={label:'Enchanted forest',val:'a glowing enchanted forest',custom:false};
        if(!state.when) state.when={label:'Long ago',val:'long, long ago',custom:false};
        if(!state.what) state.what={label:'Find the star',val:'find the missing star',custom:false};
        if(!state.why) state.why={label:'The sky went dark',val:'the night sky has gone dark',custom:false};
        currentStory = buildStory(); buildCoverAndShow();
      },
      openBook: openBook, show: show
    };
  });
})();
