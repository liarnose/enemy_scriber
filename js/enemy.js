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
        <li class="enemy_stat enemy_stat__l"><h4>ヘイト倍率</h4><span>×5</span></li>
      </ul>
      <ul class="enemy_stats">
        <li class="enemy_stat enemy_stat__s"><h4>行動力</h4><span>3</span></li>
        <li class="enemy_stat enemy_stat__s"><h4>移動力</h4><span>2</span></li>
        <li class="enemy_stat enemy_stat__s"><h4>STR</h4><span>2</span></li>
        <li class="enemy_stat enemy_stat__s"><h4>DEX</h4><span>2</span></li>
        <li class="enemy_stat enemy_stat__s"><h4>POW</h4><span>1</span></li>
        <li class="enemy_stat enemy_stat__s"><h4>INT</h4><span>1</span></li>
      </ul>
      <ul class="enemy_stats">
        <li class="enemy_stat enemy_stat__m"><h4>回避</h4><span>2+2D</span></li>
        <li class="enemy_stat enemy_stat__m"><h4>抵抗</h4><span>1+2D</span></li>
        <li class="enemy_stat enemy_stat__l"><h4>物理防御力</h4><span>6</span></li>
        <li class="enemy_stat enemy_stat__l"><h4>魔法防御力</h4><span>4</span></li>
      </ul>
      <h4 class="enemy_small-header">▼特技</h4>
      <dl class="enemy_skills">
        <dt class="enemy_skill-name">《野蛮な魂》</dt><dd class="enemy_skill-stat">＿常時＿このエネミーが［追撃］［衰弱］を受ける時、その強度は-10される。強度が0以下になった場合は［追撃］［衰弱］を受けない。また［放心］［萎縮］を受ける時、それらの代わりに［惑乱］を受ける。</dd>
        <dt class="enemy_skill-name">《再行動》</dt><dd class="enemy_skill-stat">＿ラウンド1回＿このエネミーが［行動済み］になった時に使用する。このエネミーは即座に［未行動］となり、その後ラウンド終了時まで【行動力】が0になる。</dd>
        <dt class="enemy_skill-name">《ふっ飛ばしの一撃》</dt><dd class="enemy_skill-stat">＿［白兵攻撃］＿メジャー＿対決（4+3D/回避）＿単体＿至近＿［25＋2D］の物理ダメージを与え、1Sqまで［即時移動（強制）］させる。〔達成値：18〕代わりに2Sqまで［即時移動（強制）］させる。〔因果力1〕「対象：範囲（選択）」に変更する。</dd>
        <dt class="enemy_skill-name">《逆恨み》</dt><dd class="enemy_skill-stat">＿クリンナップ＿広範囲2＿至近＿このエネミー受けているBSを1つ解除する。これによってBSが解除された場合、範囲内の全PCのヘイトを2上昇させる。</dd>
      </dl>
      <h4 class="enemy_small-header">▼EXパワー＆付与特技</h4>
      <dl class="enemy_skills">
        <dt class="enemy_skill-name">《変異種：濁流使い》</dt><dd class="enemy_skill-stat">＿［GM］［調整］＿コストとして【因果力】3点を支払う。〈撥ね退けの人食い赤鬼〉は《鉄砲水》の特技を得る。</dd>
        <dt class="enemy_skill-name">《鉄砲水》</dt><dd class="enemy_skill-stat">＿［魔法攻撃］［冷気］＿メジャー＿対決（1+3D/抵抗）＿単体＿4Sq＿シーン1回＿［20＋2D］の魔法ダメージを与え、3Sqまで［即時移動（強制）］させる。〔因果力1〕再利用可能。</dd>
      </dl>

      <h4 class="enemy_small-header">▼ドロップ品</h4>
      <table class="enemy_items">
        <thead>
          <tr><th>1～3</th><th>4～6</th><th>固定</th></tr>
        </thead>
        <tbody>
          <tr><td>鬼の角［魔触媒2］（20G）×3</td><td>鬼の腕［換金］（120G）</td><td>怪しい丸薬［コア素材］（30G）</td></tr>
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
  var text = "";
  for(var tag of data.tags){
    text = text + '<li class="enemy_tag">' + tag + '</li>\n';
  }
      
  return text;
}