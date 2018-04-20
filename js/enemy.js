$(()=>{
  $("#enemy-scriber_start").on("click", ()=>{
    
    const url = "https://lhrpg.com/lhz/ij/1582.json";
    var data;
    
    getData(url).done((result)=>{
      data = result;    
      $("head").append('<link rel="stylesheet" href="css/enemy.css"/>')

      $("body").html(`
  <section class="page">
    <article class="enemy">
      <header class="enemy_header">
        <h3 class="enemy_name">〈${data.name}〉<small>${data.ruby}</small> </h3>
        <ul class="enemy_tags">
          ${formatTags(data)}
        </ul>
      </header>
      <ul class="enemy_stats">
        <li class="enemy_stat enemy_stat__s"><h4>ランク</h4><span>${data.character_rank}</span></li>
        <li class="enemy_stat enemy_stat__l"><h4>識別難易度</h4><span>${data.identification}</span></li>
        <li class="enemy_stat enemy_stat__s"><h4>HP</h4><span>${data.hit_point}</span></li>
        ${data.fate > 0 ? '<li class="enemy_stat enemy_stat__s"><h4>因果力</h4><span>'+data.fate+'</span></li>':''}
        <li class="enemy_stat enemy_stat__l"><h4>ヘイト倍率</h4><span>${formatHate(data)}</span></li>
      </ul>
      <ul class="enemy_stats">
        <li class="enemy_stat enemy_stat__s"><h4>行動力</h4><span>${data.action}</span></li>
        <li class="enemy_stat enemy_stat__s"><h4>移動力</h4><span>${data.move}</span></li>
        <li class="enemy_stat enemy_stat__s"><h4>STR</h4><span>${data.strength}</span></li>
        <li class="enemy_stat enemy_stat__s"><h4>DEX</h4><span>${data.dexterity}</span></li>
        <li class="enemy_stat enemy_stat__s"><h4>POW</h4><span>${data.power}</span></li>
        <li class="enemy_stat enemy_stat__s"><h4>INT</h4><span>${data.intelligence}</span></li>
      </ul>
      <ul class="enemy_stats">
        <li class="enemy_stat enemy_stat__m"><h4>回避</h4><span>${formatAvoid(data)}</span></li>
        <li class="enemy_stat enemy_stat__m"><h4>抵抗</h4><span>${formatResist(data)}</span></li>
        <li class="enemy_stat enemy_stat__l"><h4>物理防御力</h4><span>${data.physical_defense}</span></li>
        <li class="enemy_stat enemy_stat__l"><h4>魔法防御力</h4><span>${data.magic_defense}</span></li>
      </ul>
      <h4 class="enemy_small-header">▼特技</h4>
      <dl class="enemy_skills">
        ${formatSkills(data)}
      </dl>

      <h4 class="enemy_small-header">▼ドロップ品</h4>
      <table class="enemy_items">
        <thead>
          <tr>${formatItemNums(data)}</tr>
        </thead>
        <tbody>
          <tr>${formatItems(data)}</tr>
        </tbody>
      </table>
    </article>
  </section>
      `);
    });
  });
});

function getData(url){
  return $.getJSON(url, {dataType:"json"});
}

function formatTags(data){
  let text = "";
  for(let tag of data.tags){
    text = text + '<li class="enemy_tag">' + tag + '</li>\n';
  }
      
  return text;
}

function formatHate(data){
  if(data.hate == 0){
    return "なし";
  } else{   
  return "×" + data.hate;
  }
}

function formatAvoid(data){
  if(data.avoid_dice == 0){
    return data.avoid + "［固定］";
  } else{   
  return data.avoid + "+" + data.avoid_dice + "D";
  }
}

function formatResist(data){
  if(data.resist_dice == 0){
    return data.resist + "［固定］";
  } else{   
  return data.resist + "+" + data.resist_dice + "D";
  }
}

function formatSkills(data) {
  let text = "";
  for(let skill of data.skills)
  {
    let stext = "";
    stext = '<dt class="enemy_skill-name">《' + skill.name + '》</dt><dd class="enemy_skill-stat">'
    stext = stext + (skill.tags.length ? '＿' + formatSkillTags(skill) : '');
    stext = stext + (skill.timing ? '＿' + skill.timing : '');
    stext = stext + (skill.role ? '＿' + skill.role : '');
    stext = stext + (skill.target ? '＿' + skill.target : '');
    stext = stext + (skill.range ? '＿' + skill.range : '');
    stext = stext + (skill.limit ? '＿' + skill.limit : '');
    stext = stext + (skill.function ? '＿' + skill.function : '');
    
    stext = stext + '<dd>';
    text = text + stext;
    
  }
  
  return text;
}

function formatSkillTags(skill) {
  let text ="";
    for(let tag of skill.tags){
      text = text + "［"+tag+"］";
    }
  return text;
}

function formatItemNums(data){
  let text = "";
  for(let item of data.items){
    text = text + '<th>' + item.dice + '</th>\n';
  }
  
  return text;
}

function formatItems(data){
  let text = "";
  for(let item of data.items){
    text = text + '<td>' + item.item + '</td>\n';
  }
  
  return text;
}