//厳格モード エラー表示をちゃんとやってくれるらしい
'use strict';
// いくつかオブジェクトを指定する
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

//.onclickによって「そのボタンを押したとき」を獲得する
// assessmentButtonというオブジェクトにonclickというプロパティを設定している
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0){
        //名前が空の時は処理を終了する  functionに対してのreturnを突っ込むという構成
        //入力が空である時の表現を.length === 0 で取り扱う。これを"ガード句"と呼ぶらしい
        return;
    }
    console.log(userName);

    // Todo 診断結果の表示
    
    //２回目以降のクリックで診断結果を一回消す
    resultDivided.innerText = "";
    
    const header = document.createElement('h3');
    // .createElementで要素を作成する <h3></h3>など。 
    header.innerText = '診断結果';
    // これでheaderは"診断結果"というh3の文字列を保有する　要素になった。
    resultDivided.appendChild(header);
    //.appendChildで子を追加する
    //これで resultDividedというオブジェクトに、headerが子要素として加わった。

    //以下で診断結果の文字列を挿入する
    const paragraph = document.createElement('p');
    paragraph.innerText = assessment(userName);
    resultDivided.appendChild(paragraph);

    // Todo ツイートエリアの表示
    tweetDivided.innerText = "";   
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='+encodeURIComponent('あなたのいいところ')+'&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    //.setAttributeで属性を追加する　今回はhrefを追加し、その値をhrefValueとした。
    anchor.className = "twitter-hashtag-button";
    anchor.setAttribute('data-text', assessment(userName));
    // resultでいいんか？ assessment(userName)を返すのが正しいかと思ってた。その中で定義されてるのと一緒だし参照してもいいでしょということか。
    // resultあかんやんけ！result出力がこのコードよりも下だからか。
    // そもそもresultとして定義してなかったわ。paragraph.innerTextのところで本来的には定義されている
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
}

//テキストフィールドでEnter押した際にも診断されるようにする
userNameInput.onkeydown = event =>{
    if(event.key === 'Enter'){
        //Todo assessmentボタンのonclick()処理を呼び出す
        assessmentButton.onclick();
    }
}

const answers = [
//const:再代入不可能な変数, let:{}で囲まれた中で何度も再代入可能な変数, var:使うな
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
'{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。',
]

/*
* 名前の文字列を渡すと診断結果を返す関数
* @param {string} userName ユーザの名前
* @return {string} 診断結果
*/
//この記載の仕方はJSDocというコメントのあり方 関数のインターフェース定義の説明を簡潔にしてくれる
function assessment(userName){
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfChairCode = 0;
    for (let i=0; i< userName.length; i++){
        sumOfChairCode = sumOfChairCode + userName.charCodeAt(i);
    }
    
    // 文字のコード番号の合計をパターン数で割り、余りを診断にあてがう
    const index = sumOfChairCode % answers.length;
    let result = answers[index];

    //そのままだと"{userName}のいいところ〜"と出力されてしまうので、入力された文字列に置き換える
    result = result.replaceAll('{userName}',userName);
    //診断結果を出力
    return result;
}

//テストコード
//resultのuserNameが前半と後半どちらも正しく反映されているか
console.assert(
    assessment('太郎') ===
    '太郎ののいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
)
//入力が同じ名前なら、同じ診断結果を出力するか
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力しますが、その処理が正しくありません。'

)
