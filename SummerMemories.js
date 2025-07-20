/*変化する要素をまとめて取得 スプレッド構文で配列にする*/

    //画像のwrapを取得
    let imagesItems = [...document.querySelectorAll(".img-wrap")];
                        //ドキュメントのquerySelectorAll関数
        console.log(imagesItems);
    //h2タグ（文字）を取得
    let sectionItemTitle = [...document.querySelectorAll("h2")];
    //タイトル（文字）を取得
    let titleMassage = document.querySelector(".title");

    //具体的にいつ発動させるのかを決めるオプション
    let options = {
        rootMargin: "0px", //デフォルトで０.marginとほぼ同じ。
        threshold: 0.5, //閾値は0.2。これが１になると完全に画面におさまってから発動する
    };

/*「どの位置にいるのか」を監視する。特定の位置に来たら関数を呼ぶ*/
    //監視対象になった瞬間、activeを付加する関数
    let setItemActive = (entries) => {
        // console.log(entries)// IntersectionObserverEntryを確認する用
       
        //entry変数にIntersectionObserverEntryの要素を取得
        entries.forEach((entry) => {
            console.log(entry);
            // isIntersectingがTrueになっていることで交差し、監視できてるか。
            if(entry.isIntersecting){
                // エントリーの要素のターゲットの中にクラスリストを入れる
                entry.target.classList.add("active") ;
            } else{
                //画面外に行っても効果がでるように
                entry.target.classList.remove("active");
            }
        });
    };


    let observer = new IntersectionObserver(setItemActive, options); //インスタンス化   
    // img-wrapは偶数（左）と奇数（右）で出現する場所が違うように処理
    //imagesItemsは5つのwrapそれをひとつづつ取り出す
    imagesItems.map((item, index) => { 
        //itemとindexの内容
        console.log(item, index);
        item.children[0].style.backgroundImage = `url(./images/${index + 1}.jpg)`;
        index % 2 == 0 ? (item.style.left = "55%") : (item.style.left = "5%");
        observer.observe(item);
    });

    sectionItemTitle.map((title, index) => {
        index % 2 == 0 ? (title.style.left = "45%") : (title.style.left = "25%");
        observer.observe(title);
    });

    //obeserve関数で監視する
     observer.observe(titleMassage);