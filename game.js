const state = {
  ingredients: [],
  discoveries: [],
  pantry: [],
  lastrand: -1,
  sound: true,
  moves: localStorage.getItem('sfa_moves') ? localStorage.getItem('sfa_moves') : 0,
  D: {}
};

const findResult = (id1, id2) => {
  return recipes.find(recipe => {
    return (
      (recipe.i[0] == id1 && recipe.i[1] == id2) ||
      (recipe.i[0] == id2 && recipe.i[1] == id1)
    );
  }) || [];
};

const makeCanvas = (i) => {
  let cnew = document.getElementById('c' + i);
  if (!cnew) {
    cnew = document.getElementById('ctmp').cloneNode(true);
    cnew.setAttribute('id', 'c' + i);
    document.body.appendChild(cnew);
  }
  return cnew;
};

const drawEmoji = (i, emoji, x, y, size) => {
  const cnew = makeCanvas(i);
  const ctxnew = cnew.getContext('2d');
  ctxnew.font = size + 'px sans-serif';
  ctxnew.textAlign = 'left';
  ctxnew.fillText(emoji, x, y);
};

const prepSlots = () => {
  elements.forEach((element, e) => {
    const slot = document.createElement('div');
    slot.id = 'pantrySlot' + e;
    slot.className = 'pantrySlot copy';
    document.getElementById('pantry').appendChild(slot);
    if (elements[e][4]) {
      const slotTrophy = document.createElement('div');
      slotTrophy.id = 'trophySlot' + e;
      slotTrophy.className = 'pantrySlot trophy';
      document.getElementById(movies.includes(e) ? 'collectioncontent' : 'finalcontent').appendChild(slotTrophy);
    }
  });
};

const prepElements = () => {
  elements.forEach((element, e) => {
    const [name, icon, pos, desc] = element;
    if (Array.isArray(icon)) {
      icon.forEach((emoji, b) => {
        if (pos[b]) {
          const [x, y, size = 70] = pos[b];
          drawEmoji(e, emoji, x, y, size);
        }
      });
    } else if (pos == "svg") {
      svg(icon, e);
    } else {
      drawEmoji(e, icon, 0, 70, 70);
    }
  });
};

const prepIcons = () => {
  elements.forEach((element, e) => {
    const final = elements[e][4] == 1;
    const pantrySlot = document.getElementById('pantrySlot' + e);
    if (pantrySlot) {
      const img = document.createElement('img');
      img.src = document.getElementById('c' + e).toDataURL();
      img.className = 'pantryIngredient drag';
      img.id = 'i' + ingredients.length;
      img.setAttribute('elid', e);
      ingredients.push('i' + ingredients.length);
      const desc = document.createElement('span');
      desc.innerText = element[0];
      pantrySlot.appendChild(img);
      pantrySlot.appendChild(desc);
      pantrySlot.style.display = 'none';
      if (final) {
        const img2 = img.cloneNode();
        img2.id = 'coll' + e;
        img2.className += " trophy" + (movies.includes(e) ? " movie" : "");
        const trophySlot = document.getElementById('trophySlot' + e);
        if (trophySlot) {
          trophySlot.appendChild(img2);
          trophySlot.appendChild(desc.cloneNode(true));
          trophySlot.style.display = 'none';
        }
      }
    }
  });
};

const finalize = () => {
  elements.forEach((element, i) => {
    pantry[document.getElementById('i' + i).getAttribute('elid')] = i;
    const trophySlot = document.getElementById('trophySlot' + i);
    if (trophySlot) trophySlot.style.display = 'none';
    discoveries[i] = false;
  });

  [...Array(4).keys()].forEach(i => {
    discoveries[i] = true;
  });

  if (localStorage.getItem('sfa_discoveries')) {
    discoveries = localStorage.getItem('sfa_discoveries').split(',').map(discovery => discovery === 'true');
  }

  discoveries.forEach((discovery, i) => {
    if (discovery) {
      const slot = document.getElementById('pantrySlot' + i);
      if (slot) slot.style.display = 'inline';
    } else {
      const slot = document.getElementById('pantrySlot' + i);
      if (slot) slot.style.display = 'none';
    }
  });

  movies.forEach(e => {
    const trophySlot = document.getElementById('trophySlot' + e);
    if (trophySlot) {
      trophySlot.style.display = 'inline';
      if (!discoveries[e]) trophySlot.style.opacity = .3;
    }
  });

  document.getElementById('downbutton').src = makeSvg('p66600001M17,69L1,1c0,0,15,21,32,0L17,69z;i17693301000non02;pnonCCC02M1,1c0,0,15,21,32,0;i17690101CCCnon02', 40, 80);
  document.getElementById('upbutton').src = makeSvg('p66600001M17,0L1,68c0,0,15-21,32,0L17,0z;i33681700000non02;pnon00002M1,68c0,0,15-21,32,0;i01681700CCCnon02', 40, 80);
};

const prepHome = () => {
  if (localStorage.getItem('sfa_discoveries')) {
    document.getElementById('playbutton').innerText = "CONTINUE";
  }
  const hcx = document.getElementById('homecanvas').getContext("2d");
  hcx.globalAlpha = .5;
  [...Array(6).keys()].forEach(i => hcx.drawImage(document.getElementById('i3'), [0, 159, 189, 20, 80, 299][i], [0, 20, 0, 158, 158, 158][i]));
  hcx.globalAlpha = .3;
  [...Array(3).keys()].forEach(i => hcx.drawImage(document.getElementById('i3'), [0, 159, 189][i], [298, 320, 298][i]));
  hcx.globalAlpha = .2;
  hcx.drawImage(document.getElementById('i3'), 20, 450);
  hcx.drawImage(document.getElementById('i3'), 80, 450);
  hcx.drawImage(document.getElementById('i3'), 299, 450);
  hcx.globalAlpha = .4;
  hcx.filter = 'blur(1px)';
  hcx.drawImage(document.getElementById('i15'), 0, 29);
  hcx.drawImage(document.getElementById('i33'), 275, 29);
  hcx.globalAlpha = .3;
  hcx.drawImage(document.getElementById('i72'), 10, 230);
  hcx.drawImage(document.getElementById('i30'), 270, 230);
  document.getElementById('home').style.backgroundImage = 'url(' + document.getElementById('homecanvas').toDataURL() + ')';
  close('loader');
};

const store = (k, z) => {
  localStorage.setItem(k, z);
};

const scrollUp = () => {
  document.getElementById('pantry').scrollTop -= 400;
};

const scrollDown = () => {
  document.getElementById('pantry').scrollTop += 400;
};

const score = () => {
  let pts = 0;
  discoveries.forEach(discovery => {
    if (discovery) pts++;
  });
  document.getElementById('score').innerText = pts - 4;
  document.getElementById('max').innerText = discoveries.length - 4;
  if (pts === discoveries.length) {
    win();
  }
  let foundmovies = 0;
  movies.forEach(e => {
    if (discoveries[e]) foundmovies++;
  });
  document.getElementById('collectionnumbers').innerText = foundmovies + '/13';
};

const win = () => {
  document.getElementById('moves').innerText = "You found every element in " + moves + " moves.";
  openm('wincontent');
  openm('collection');
};

const close = (m) => {
  document.getElementById(m).style.display = "none";
};

const clearForge = () => {
  const forge = document.getElementById('forge');
  while (forge.firstChild) {
    forge.removeChild(forge.firstChild);
  }
};

const openm = (m) => {
  document.getElementById(m).style.display = "block";
};

const play = () => {
  hintInterval = setInterval(enableHint, hintTime);
  finalize();
  score();
  close('home');
  document.getElementById('soundbutton').onclick = null;
  document.getElementById('playbutton').innerText = 'CONTINUE';
  if (!listened) {
    document.addEventListener('pointerdown', pointerdown);
    document.addEventListener('touchstart', pointerdown, { passive: false });
    document.addEventListener('touchstart', () => A.resume());
    document.addEventListener('pointermove', pointermove);
    document.addEventListener('touchmove', pointermove, { passive: false });
    document.addEventListener('pointerup', pointerup);
    document.addEventListener('touchend', pointerup);
    listened = true;
  }
};

const toggleSound = () => {
  sound = !sound;
  document.getElementById('soundbutton').innerText = sound ? 'SOUND ON' : 'SOUND OFF';
};

const newgame = () => {
  [...Array(4).keys()].forEach(() => scrollUp());
  localStorage.removeItem('sfa_discoveries');
  localStorage.removeItem('sfa_moves');
  discoveries = [];
  moves = 0;
  close('wincontent');
  resetHints();
  close('collection');
  clearForge();
  play();
};

const enableHint = () => {
  document.getElementById('hint').style.opacity = 1;
  hintsEnabled = true;
};

const showHint = () => {
  document.getElementById('discovery').innerText = '';
  document.getElementById('discoveryimage').style.display = 'none';
  document.getElementById('discoverydesc').innerHTML = findHint();
  openm('modal');
};

const upsell = () => {
  document.getElementById('discovery').innerText = 'Want more hints?';
  document.getElementById('discoveryimage').style.display = 'none';
  document.getElementById('discoverydesc').innerHTML = 'Follow the link below <a href="https://www.linkedin.com/company/chromegaming" target="_new">Click Here</a> to learn more about the game.';
  openm('modal');
};

const go = (href) => {
  window.open(href, '_new');
};

const findHint = () => {
  const hints = [];
  for (let d = 0; d < discoveries.length; d++) {
    for (let e = 0; e < discoveries.length; e++) {
      if (discoveries[d] && discoveries[e]) {
        const result = findResult(d, e);
        if (discoveries[result[0]]) {
          continue;
        } else if (result.length > 1) {
          hints.push("Try creating " + elements[result[0]][0] + " with " + elements[e][0] + ".");
        }
      }
    }
  }
  const hintNumber = Math.floor(Math.random() * hints.length);
  resetHints();
  return hints[hintNumber];
};

const resetHints = () => {
  hintsEnabled = false;
  clearInterval(hintInterval);
  hintInterval = setInterval(enableHint, hintTime);
  document.getElementById('hint').style.opacity = .3;
};

const pointerdown = (e) => {
  if (touchinprogress) return;
  touchinprogress = true;
  e.preventDefault();
  const { pageX, pageY, target, touches } = e;
  D.w = 1;
  D.g = null;
  D.n = null;
  if (touches) {
    D.g = document.elementFromPoint(touches[0].pageX, touches[0].pageY);
  } else {
    D.g = target;
  }
  D.scroll = target.parentElement.parentElement.scrollTop;
  const id = D.g.id;
  switch (id) {
    case 'homebutton':
      openm('home');
      break;
    case 'collectionbutton':
      openm('collection');
      break;
    case 'playbutton':
      play();
      break;
    case 'newgamebutton':
    case 'newgamebutton2':
      newgame();
      break;
    case 'upbutton':
      scrollUp();
      break;
    case 'downbutton':
      scrollDown();
      break;
    case 'soundbutton':
      toggleSound();
      break;
    case 'hint':
      hintsEnabled ? showHint() : upsell();
      break;
    default:
      if (id === 'trash') clearForge();
      if (id === 'modal') close('modal');
      if (id === 'trophySlot' || target.classList.contains("modal")) close('collection');
  }
  while (D.g !== document && !D.g.classList.contains("drag")) {
    D.g = D.g.parentNode;
  }
  if (D.g === document) {
    D.g = null;
  } else if (D.g.parentNode.classList.contains("move") || D.g.parentNode.classList.contains("copy")) {
    D.X = touches ? touches[0].pageX : pageX;
    D.Y = touches ? touches[0].pageY : pageY;
    D.x = D.X - target.offsetLeft;
    D.y = D.Y - target.offsetTop;
    D.n = document.body.appendChild(D.g.cloneNode(true));
    D.n.className = D.n.className.replace(/pantryIngredient/, 'ingredient');
    D.n.id = 'i' + ingredients.length++;
    if (D.g.parentNode.classList.contains("move")) {
      D.g.style.visibility = "hidden";
      D.g.m = D.g;
    }
    D.n.style.position = "absolute";
    D.n.style.pointerEvents = "none";
    D.n.style.left = D.X - D.x - 3 + "px";
    D.n.style.top = D.Y - D.y - 3 + "px";
  }
};

const pointermove = (e) => {
  e.preventDefault();
  if (D.w && D.n) {
    D.X = e.touches ? e.touches[0].pageX : e.pageX;
    D.Y = e.touches ? e.touches[0].pageY : e.pageY;
    D.n.style.left = D.X - D.x - 3 + "px";
    D.n.style.top = D.Y - D.y - 3 - D.scroll + "px";
    D.lastX = e.touches ? e.touches[0].pageX : e.pageX;
    D.lastY = e.touches ? e.touches[0].pageY : e.pageY;
  }
};

const pointerup = (e) => {
  A.resume();
  touchinprogress = false;
  e.preventDefault();
  D.w = 0;
  const { pageX, pageY, target, touches } = e;
  if (touches && D.X) {
    D.p = document.elementFromPoint(D.X, D.Y);
  } else {
    D.p = target;
  }
  if (D.n) {
    if (D.p.classList.contains("ingredient")) {
      moves++;
      store('sfa_moves', moves);
      const id1 = D.p.getAttribute('elid');
      const id2 = D.n.getAttribute('elid');
      const result = findResult(id1, id2);
      if (result.length > 0) {
        const imgId = pantry[result[0]];
        const c = document.getElementById('i' + imgId).cloneNode(true);
        c.style.left = D.lastX - D.x - 3 + "px";
        c.style.top = D.lastY - D.y - 3 - D.scroll + "px";
        c.className = 'ingredient drag';
        c.id = 'i' + (ingredients.length);
        c.style.display = 'inline';
        c.style.position = 'absolute';
        ingredients[ingredients.length] = 'i' + (ingredients.length);
        document.getElementById('forge').appendChild(c);
        D.p.remove();
        D.n.remove();
        if (D.g.m) D.g.m.remove();
        if (elements[result[0]][4] !== 1) {
          document.getElementById('pantrySlot' + result[0]).style.display = 'inline';
        }
        if (!discoveries[result[0]]) {
          resetHints();
          document.getElementById('discovery').innerText = elements[result[0]][0];
          document.getElementById('discoveryimage').style.display = 'inline';
          document.getElementById('discoveryimage').className = 'focusin modal';
          document.getElementById('discoveryimage').src = document.getElementById('i' + imgId).src;
          document.getElementById('discoverydesc').innerHTML = elements[result[0]][3] ? elements[result[0]][3] : '';
          openm('modal');
          discoveries[result[0]] = true;
          store('sfa_discoveries', discoveries);
          if (elements[result[0]][4]) {
            document.getElementById('trophySlot' + result[0]).style.display = 'inline';
            if (movies.includes(result[0])) {
              document.getElementById('trophySlot' + result[0]).style.opacity = 1;
            }
          }
          const rand = Math.floor(Math.random() * (result[1] === 'n' ? non.length : non2.length));
          playSong(result[1] === 'n' ? non[rand] : non2[rand]);
        }
        score();
        return;
      }
    }
    while (D.p !== document && !D.p.classList.contains("drop")) {
      D.p = D.p.parentNode;
    }
    if (D.p !== document) {
      const f = D.p.appendChild(D.n.cloneNode(true));
      f.style.position = "absolute";
      f.style.pointerEvents = "";
      D.X = pageX;
      D.Y = pageY;
      f.style.left = D.X - D.x - 3 + "px";
      f.style.top = D.Y - D.y - 3 + "px";
    }
    if (D.g.m) {
      D.g.remove();
    }
    D.n.remove();
  }
  bugfix();
};

const clearForge = () => {
  const forge = document.getElementById('forge');
  while (forge.firstChild) {
    forge.removeChild(forge.firstChild);
  }
};
