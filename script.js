// 検索履歴データ（LocalStorageに保存）
let searchAnalytics = {
    searches: [], // { keyword, timestamp, benefits: [] }
    benefitCounts: {}, // benefitId: count
    categoryCounts: {} // category: count
};

// LocalStorageから検索履歴を読み込む
function loadAnalytics() {
    const saved = localStorage.getItem('mki_search_analytics');
    if (saved) {
        searchAnalytics = JSON.parse(saved);
    }
}

// LocalStorageに検索履歴を保存
function saveAnalytics() {
    localStorage.setItem('mki_search_analytics', JSON.stringify(searchAnalytics));
}

// 福利厚生データベース
const benefitsDatabase = [
    {
        id: 1,
        icon: "💰",
        name: "賞与",
        description: "年2回（夏・冬）、会社全体および個人の業績を考慮して支給されます。",
        amount: "年2回支給",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["賞与", "ボーナス", "夏", "冬"],
        category: "給与",
        requiresApplication: false,
        applicationProcess: null
    },
    {
        id: 2,
        icon: "🚃",
        name: "通勤費・交通費支給",
        description: "通勤に必要な交通費を全額支給します。",
        amount: "全額支給",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["通勤", "交通費", "定期券", "電車"],
        category: "日常"
    },
    {
        id: 3,
        icon: "💻",
        name: "在宅勤務手当",
        description: "在宅勤務に必要な環境整備費用（光熱費、通信費等）を補助します。",
        amount: "手当支給",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["在宅", "リモート", "テレワーク", "自宅"],
        category: "日常"
    },
    {
        id: 4,
        icon: "🏠",
        name: "住宅補助",
        description: "住宅にかかる費用を補助します。",
        amount: "補助金支給",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["住宅", "家賃", "引っ越し", "引越し", "賃貸"],
        category: "住宅"
    },
    {
        id: 5,
        icon: "🏢",
        name: "常駐手当",
        description: "顧客先に常駐する社員に支給される手当です。",
        amount: "手当支給",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["常駐", "客先", "派遣", "プロジェクト"],
        category: "業務"
    },
    {
        id: 6,
        icon: "✈️",
        name: "リフレッシュ休暇手当",
        description: "勤続10年経過後、5年ごとに年次有給休暇とは別に5日間のリフレッシュ休暇が付与され、休暇取得時には手当が支給されます。",
        amount: "5日間 + 手当支給",
        conditions: {
            minYears: 10,
            marital: null,
            children: null
        },
        keywords: ["休暇", "旅行", "リフレッシュ", "バケーション"],
        category: "休暇",
        requiresApplication: true,
        applicationProcess: {
            steps: [
                "人事システムにログイン",
                "「休暇申請」メニューを選択",
                "「リフレッシュ休暇」を選択",
                "希望日程を入力（5日間連続または分割可能）",
                "上長の承認を得る",
                "承認後、旅行計画書を提出（任意）"
            ],
            deadline: "取得希望日の1ヶ月前まで",
            department: "人事部",
            notes: "年度内に取得してください。手当は休暇取得後に支給されます。"
        }
    },
    {
        id: 7,
        icon: "💼",
        name: "ライフデザイン手当（退職金制度）",
        description: "確定拠出年金とライフデザイン給（前払退職金）の組み合わせで構成され、社員のライフプランに合わせた運用が可能です。",
        amount: "確定拠出年金 + 前払退職金",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["退職金", "年金", "将来", "老後", "ライフプラン"],
        category: "将来設計"
    },
    {
        id: 8,
        icon: "🤝",
        name: "採用貢献手当",
        description: "社員が紹介したキャリア採用者が一定期間在籍した場合、紹介者に手当が支給されます。",
        amount: "手当支給",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["採用", "紹介", "リファラル"],
        category: "その他"
    },
    {
        id: 9,
        icon: "💵",
        name: "財形貯蓄",
        description: "給与天引きによる積立貯蓄制度で、一般・年金・住宅の3種類があります。",
        amount: "給与天引き貯蓄",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["貯蓄", "貯金", "財形", "積立"],
        category: "将来設計",
        requiresApplication: true,
        applicationProcess: {
            steps: [
                "人事システムにログイン",
                "「福利厚生」→「財形貯蓄」を選択",
                "貯蓄種類を選択（一般・年金・住宅）",
                "月額積立額を設定",
                "金融機関を選択",
                "申込書をダウンロードして記入",
                "人事部に提出"
            ],
            deadline: "毎月15日まで（翌月から適用）",
            department: "人事部 福利厚生担当",
            notes: "年金財形と住宅財形は非課税のメリットがあります。"
        }
    },
    {
        id: 10,
        icon: "💍",
        name: "慶弔見舞金（結婚祝い金）",
        description: "結婚された社員の方に祝い金を支給します。新生活のスタートを応援します。",
        amount: "祝い金支給",
        conditions: {
            minYears: 0,
            marital: "married",
            children: null
        },
        keywords: ["結婚", "婚姻", "入籍", "結婚式"],
        category: "ライフイベント"
    },
    {
        id: 11,
        icon: "👶",
        name: "慶弔見舞金（出産祝い金）",
        description: "お子様が誕生された際に祝い金を支給します。",
        amount: "祝い金支給",
        conditions: {
            minYears: 0,
            marital: null,
            children: "yes"
        },
        keywords: ["出産", "子供", "赤ちゃん", "誕生", "生まれ"],
        category: "ライフイベント"
    },
    {
        id: 12,
        icon: "🕊️",
        name: "慶弔見舞金（弔慰金・見舞金）",
        description: "家族の不幸時の弔慰金、災害時の見舞金などが支給されます。",
        amount: "見舞金支給",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["弔慰", "見舞", "災害", "不幸"],
        category: "ライフイベント"
    },
    {
        id: 13,
        icon: "🛡️",
        name: "総合福祉団体定期保険",
        description: "会社が全額保険料を負担し、社員が死亡または高度障害となった場合に保険金が支給されます。",
        amount: "会社全額負担",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["保険", "死亡", "障害", "補償"],
        category: "保険"
    },
    {
        id: 14,
        icon: "🎓",
        name: "遺児育英資金",
        description: "社員が死亡または高度障害により退職した場合、その遺児や子女の育英のための一時金が支給されます。",
        amount: "一時金支給",
        conditions: {
            minYears: 0,
            marital: null,
            children: "yes"
        },
        keywords: ["育英", "教育", "遺児", "子供"],
        category: "保険"
    },
    {
        id: 15,
        icon: "📋",
        name: "団体扱い生命保険・損害保険",
        description: "団体割引により、個人契約よりも安価に加入でき、年末調整の手間も省けます。",
        amount: "団体割引",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["保険", "生命保険", "損害保険", "団体"],
        category: "保険"
    },
    {
        id: 16,
        icon: "🏥",
        name: "健康診断",
        description: "全社員が会社負担で健康診断を受診できます。希望者は有償オプション検査も受けられます。",
        amount: "全額会社負担",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["健康診断", "人間ドック", "検診", "健康", "医療"],
        category: "健康"
    },
    {
        id: 17,
        icon: "💚",
        name: "こころとからだの健康相談",
        description: "心身の健康、介護、育児に関する無料相談窓口が設けられており、必要に応じて医師との直接通話やカウンセリングも可能です。",
        amount: "無料相談サービス",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["相談", "カウンセリング", "メンタル", "健康", "心"],
        category: "健康"
    },
    {
        id: 18,
        icon: "👶",
        name: "育児休業制度",
        description: "育児のための休業制度です。育児短時間勤務、子の看護休暇も利用可能です。",
        amount: "育児休業取得可能",
        conditions: {
            minYears: 0,
            marital: null,
            children: "yes"
        },
        keywords: ["育児", "休業", "子育て", "保育園", "子供", "短時間"],
        category: "育児",
        requiresApplication: true,
        applicationProcess: {
            steps: [
                "出産予定日の1ヶ月前までに上長に相談",
                "人事システムから「育児休業申請書」をダウンロード",
                "必要事項を記入（取得期間、復帰予定日など）",
                "母子手帳のコピーを添付",
                "上長の承認を得る",
                "人事部に提出（出産予定日の1ヶ月前まで）"
            ],
            deadline: "出産予定日の1ヶ月前まで",
            department: "人事部 労務担当",
            notes: "育児休業は原則として子が1歳になるまで取得可能です。保育所に入所できない場合は最長2歳まで延長できます。"
        }
    },
    {
        id: 19,
        icon: "👨‍👩‍👧",
        name: "介護休業制度",
        description: "介護のための休業制度です。介護短時間勤務、介護休暇も利用可能です。",
        amount: "介護休業取得可能",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["介護", "家族", "親", "休業", "短時間"],
        category: "ライフイベント",
        requiresApplication: true,
        applicationProcess: {
            steps: [
                "介護が必要になった時点で上長に相談",
                "人事システムから「介護休業申請書」をダウンロード",
                "医師の診断書または介護認定証明書を準備",
                "取得期間を記入（通算93日まで、3回まで分割可能）",
                "上長の承認を得る",
                "人事部に提出（休業開始希望日の2週間前まで）"
            ],
            deadline: "休業開始希望日の2週間前まで",
            department: "人事部 労務担当",
            notes: "介護休業は対象家族1人につき通算93日まで、3回まで分割して取得できます。"
        }
    },
    {
        id: 20,
        icon: "🏖️",
        name: "関東ITソフトウェア健康保険組合（ITS）",
        description: "保養施設、スポーツ施設、ゴルフ場、オートキャンプ場、ラフォーレ倶楽部、レストラン、ITS旅行パック、健康増進イベント参加など、多彩なサービスを利用できます。",
        amount: "各種施設利用可能",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["保養", "スポーツ", "ゴルフ", "旅行", "健康", "施設", "レジャー"],
        category: "レジャー",
        requiresApplication: true,
        applicationProcess: {
            steps: [
                "ITS健保のウェブサイトにアクセス",
                "社員IDでログイン",
                "利用したい施設・サービスを選択",
                "予約フォームに必要事項を入力",
                "予約確認メールを受信",
                "利用当日、社員証を持参"
            ],
            deadline: "施設により異なる（通常は利用日の1週間前まで）",
            department: "ITS健保 または 人事部",
            notes: "初回利用時はITS健保への登録が必要です。詳細は人事部にお問い合わせください。"
        }
    },
    {
        id: 21,
        icon: "🛡️",
        name: "総合保障保険・スーパー所得補償保険",
        description: "三井物産グループ会社の社員を対象としたオリジナルの団体保険制度が用意されています。",
        amount: "団体保険制度",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["保険", "所得", "補償", "三井物産"],
        category: "保険"
    },
    {
        id: 22,
        icon: "🏛️",
        name: "綱町三井倶楽部",
        description: "三井グループの限られた企業のみが会員となる会員制倶楽部で、宴会、パーティー、ウェディングなどに利用できます。",
        amount: "会員制倶楽部利用",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["倶楽部", "クラブ", "宴会", "パーティー", "ウェディング", "結婚式"],
        category: "レジャー",
        requiresApplication: true,
        applicationProcess: {
            steps: [
                "利用希望日の3ヶ月前から予約可能",
                "人事部に利用申込書を請求",
                "利用目的・日時・人数を記入",
                "上長の承認を得る（業務関連の場合）",
                "人事部経由で予約を確定",
                "利用日の1週間前までに最終人数を連絡"
            ],
            deadline: "利用希望日の1ヶ月前まで",
            department: "人事部 総務担当",
            notes: "結婚式・披露宴の場合は半年前からの予約をお勧めします。"
        }
    },
    {
        id: 23,
        icon: "🍽️",
        name: "新宿三井クラブ",
        description: "新宿三井ビル54階の会員制レストランで、家族や友人と絶景を眺めながら食事を楽しめます。",
        amount: "会員制レストラン利用",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["レストラン", "食事", "新宿", "クラブ", "景色"],
        category: "レジャー",
        requiresApplication: true,
        applicationProcess: {
            steps: [
                "利用希望日の1ヶ月前から予約可能",
                "新宿三井クラブに直接電話予約",
                "または人事部経由で予約",
                "予約時に社員番号を伝える",
                "利用当日、社員証を持参",
                "会計時に社員割引を申請"
            ],
            deadline: "利用希望日の1週間前まで",
            department: "新宿三井クラブ予約係 または 人事部",
            notes: "個人利用・接待・慶事など幅広く利用できます。予約状況により希望日時に添えない場合があります。"
        }
    },
    {
        id: 24,
        icon: "🏥",
        name: "健康保険・厚生年金保険",
        description: "健康保険、厚生年金保険、雇用保険、労働災害補償保険、介護保険（対象者のみ）に加入しています。",
        amount: "各種社会保険完備",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["保険", "健康保険", "年金", "雇用保険", "労災"],
        category: "保険"
    }
];

// DOM要素
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const employeeForm = document.getElementById('employee-form');
const profileResults = document.getElementById('profile-results');
const benefitsList = document.getElementById('benefits-list');
const employeeInfo = document.getElementById('employee-info');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatBox = document.getElementById('chat-box');
const childrenRadios = document.getElementsByName('children');
const childrenCountGroup = document.getElementById('children-count-group');

// タブ切り替え
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // タブボタンの状態を更新
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // タブコンテンツの表示を更新
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${targetTab}-tab`).classList.add('active');
    });
});

// 子供の有無に応じた人数入力フィールドの表示/非表示
childrenRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'yes') {
            childrenCountGroup.style.display = 'block';
        } else {
            childrenCountGroup.style.display = 'none';
        }
    });
});

// 社員情報フォームの送信
employeeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        age: parseInt(document.getElementById('age').value),
        years: parseInt(document.getElementById('years').value),
        marital: document.querySelector('input[name="marital"]:checked').value,
        children: document.querySelector('input[name="children"]:checked').value,
        childrenCount: document.getElementById('children-count').value || 0
    };
    
    displayBenefits(formData);
});

// 福利厚生を表示
function displayBenefits(userData) {
    // ユーザー情報を表示
    const maritalText = userData.marital === 'married' ? '既婚' : '独身';
    const childrenText = userData.children === 'yes' ? `あり（${userData.childrenCount}人）` : 'なし';
    
    employeeInfo.innerHTML = `
        <h3>${userData.name} 様</h3>
        <p>📍 住所: ${userData.address}</p>
        <p>👤 年齢: ${userData.age}歳</p>
        <p>🏢 勤続年数: ${userData.years}年</p>
        <p>💑 結婚状況: ${maritalText}</p>
        <p>👶 お子様: ${childrenText}</p>
    `;
    
    // 条件に合う福利厚生をフィルタリング
    const eligibleBenefits = filterBenefits(userData);
    
    // 福利厚生カードを表示
    benefitsList.innerHTML = '';
    eligibleBenefits.forEach(benefit => {
        const card = createBenefitCard(benefit);
        benefitsList.appendChild(card);
    });
    
    // 結果セクションを表示
    profileResults.style.display = 'block';
    profileResults.scrollIntoView({ behavior: 'smooth' });
}

// 条件に基づいて福利厚生をフィルタリング
function filterBenefits(userData) {
    return benefitsDatabase.filter(benefit => {
        // 勤続年数のチェック
        if (benefit.conditions.minYears > userData.years) {
            return false;
        }
        
        // 結婚状況のチェック（特定の条件がある場合のみ）
        if (benefit.conditions.marital && benefit.conditions.marital !== userData.marital) {
            return false;
        }
        
        // 子供の有無のチェック（特定の条件がある場合のみ）
        if (benefit.conditions.children && benefit.conditions.children !== userData.children) {
            return false;
        }
        
        return true;
    });
}

// 福利厚生カードを作成
function createBenefitCard(benefit) {
    const card = document.createElement('div');
    card.className = 'benefit-card clickable-card';
    card.setAttribute('data-benefit-id', benefit.id);
    
    // カード全体をクリック可能に
    card.addEventListener('click', (e) => {
        // ボタンのクリックイベントと干渉しないように
        if (!e.target.closest('button')) {
            if (benefit.requiresApplication) {
                openApplicationModal(benefit.id);
            } else {
                showBenefitInfo(benefit.id);
            }
        }
    });
    
    const buttonsHTML = benefit.requiresApplication ? `
        <div class="benefit-actions">
            <button class="btn-apply" onclick="event.stopPropagation(); openApplicationModal(${benefit.id})">📝 申し込む</button>
            <button class="btn-details" onclick="event.stopPropagation(); showApplicationProcess(${benefit.id})">📋 手続き方法</button>
        </div>
    ` : `
        <div class="benefit-actions">
            <button class="btn-info" onclick="event.stopPropagation(); showBenefitInfo(${benefit.id})">ℹ️ 詳細情報</button>
        </div>
    `;
    
    card.innerHTML = `
        <div class="benefit-icon">${benefit.icon}</div>
        <h3>${benefit.name}</h3>
        <p>${benefit.description}</p>
        <div class="benefit-amount">${benefit.amount}</div>
        <span class="benefit-tag">${benefit.category}</span>
        ${buttonsHTML}
    `;
    return card;
}

// チャット機能
chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // ユーザーメッセージを表示
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // ボットの応答を生成
    setTimeout(() => {
        const response = generateBotResponse(message);
        addChatMessage(response, 'bot');
    }, 500);
}

function addChatMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function generateBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // キーワードに基づいて該当する福利厚生を検索
    const matchedBenefits = benefitsDatabase.filter(benefit => {
        return benefit.keywords.some(keyword => lowerMessage.includes(keyword));
    });
    
    // 検索履歴を記録
    if (matchedBenefits.length > 0) {
        recordSearch(message, matchedBenefits);
    }
    
    if (matchedBenefits.length === 0) {
        return `申し訳ございません。「${message}」に関連する福利厚生が見つかりませんでした。<br><br>
                以下のようなキーワードでお試しください：<br>
                • 「結婚」「出産」「育児」「介護」<br>
                • 「住宅」「引っ越し」「家賃」<br>
                • 「健康診断」「保険」「相談」<br>
                • 「旅行」「保養」「レストラン」<br>
                • 「休暇」「貯蓄」「年金」`;
    }
    
    let response = `${matchedBenefits.length}件の福利厚生が見つかりました！<br><br>`;
    
    matchedBenefits.forEach(benefit => {
        response += `<strong>${benefit.icon} ${benefit.name}</strong><br>`;
        response += `${benefit.description}<br>`;
        response += `<span style="color: #006B54; font-weight: bold;">💰 ${benefit.amount}</span><br>`;
        response += `<span style="background: #d4ede7; color: #004D40; padding: 2px 8px; border-radius: 10px; font-size: 0.85em;">${benefit.category}</span><br><br>`;
    });
    
    response += `<br>詳細や申請方法については人事部までお問い合わせください。<br>他にもお探しのものがあればお気軽にお聞きください！`;
    
    return response;
}

// 検索履歴を記録
function recordSearch(keyword, benefits) {
    const timestamp = new Date().toISOString();
    
    // 検索履歴に追加
    searchAnalytics.searches.push({
        keyword: keyword,
        timestamp: timestamp,
        benefits: benefits.map(b => b.id)
    });
    
    // 福利厚生のカウントを更新
    benefits.forEach(benefit => {
        if (!searchAnalytics.benefitCounts[benefit.id]) {
            searchAnalytics.benefitCounts[benefit.id] = 0;
        }
        searchAnalytics.benefitCounts[benefit.id]++;
        
        // カテゴリのカウントを更新
        if (!searchAnalytics.categoryCounts[benefit.category]) {
            searchAnalytics.categoryCounts[benefit.category] = 0;
        }
        searchAnalytics.categoryCounts[benefit.category]++;
    });
    
    // LocalStorageに保存
    saveAnalytics();
    
    // 分析画面を更新
    updateAnalyticsDisplay();
}

// 分析画面を更新
function updateAnalyticsDisplay() {
    // 要素が存在しない場合は何もしない（分析タブが表示されていない場合）
    const totalSearchesEl = document.getElementById('total-searches');
    if (!totalSearchesEl) return;
    
    // 統計情報を更新
    const totalSearches = searchAnalytics.searches.length;
    const uniqueBenefits = Object.keys(searchAnalytics.benefitCounts).length;
    const lastSearch = searchAnalytics.searches.length > 0 
        ? formatDateTime(searchAnalytics.searches[searchAnalytics.searches.length - 1].timestamp)
        : '未検索';
    
    totalSearchesEl.textContent = totalSearches;
    document.getElementById('unique-benefits').textContent = uniqueBenefits;
    document.getElementById('last-search').textContent = lastSearch;
    
    // ランキングを更新
    updateBenefitsRanking();
    
    // キーワード履歴を更新
    updateKeywordHistory();
    
    // カテゴリチャートを更新
    updateCategoryChart();
}

// 日時をフォーマット
function formatDateTime(isoString) {
    const date = new Date(isoString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
}

// 福利厚生ランキングを更新
function updateBenefitsRanking() {
    const rankingContainer = document.getElementById('benefits-ranking');
    if (!rankingContainer) return;
    
    if (Object.keys(searchAnalytics.benefitCounts).length === 0) {
        rankingContainer.innerHTML = '<p class="no-data">まだデータがありません。チャット機能で検索を行うとここに表示されます。</p>';
        return;
    }
    
    // カウントでソート
    const sorted = Object.entries(searchAnalytics.benefitCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    rankingContainer.innerHTML = '';
    sorted.forEach(([benefitId, count], index) => {
        const benefit = benefitsDatabase.find(b => b.id === parseInt(benefitId));
        if (!benefit) return;
        
        const rankClass = index === 0 ? 'top1' : index === 1 ? 'top2' : index === 2 ? 'top3' : '';
        
        const item = document.createElement('div');
        item.className = 'ranking-item';
        item.innerHTML = `
            <div class="ranking-number ${rankClass}">${index + 1}</div>
            <div class="ranking-icon">${benefit.icon}</div>
            <div class="ranking-info">
                <div class="ranking-name">${benefit.name}</div>
                <span class="ranking-category">${benefit.category}</span>
            </div>
            <div class="ranking-count">${count}回</div>
        `;
        rankingContainer.appendChild(item);
    });
}

// キーワード履歴を更新
function updateKeywordHistory() {
    const historyContainer = document.getElementById('keyword-history');
    if (!historyContainer) return;
    
    if (searchAnalytics.searches.length === 0) {
        historyContainer.innerHTML = '<p class="no-data">まだデータがありません。</p>';
        return;
    }
    
    // 最新10件を表示
    const recentSearches = searchAnalytics.searches.slice(-10).reverse();
    
    historyContainer.innerHTML = '';
    recentSearches.forEach(search => {
        const tag = document.createElement('div');
        tag.className = 'keyword-tag';
        tag.innerHTML = `
            <span>${search.keyword}</span>
            <span class="keyword-time">${formatDateTime(search.timestamp)}</span>
        `;
        historyContainer.appendChild(tag);
    });
}

// カテゴリチャートを更新
function updateCategoryChart() {
    const chartContainer = document.getElementById('category-chart');
    if (!chartContainer) return;
    
    if (Object.keys(searchAnalytics.categoryCounts).length === 0) {
        chartContainer.innerHTML = '<p class="no-data">まだデータがありません。</p>';
        return;
    }
    
    // カテゴリの最大値を取得
    const maxCount = Math.max(...Object.values(searchAnalytics.categoryCounts));
    
    chartContainer.innerHTML = '';
    Object.entries(searchAnalytics.categoryCounts)
        .sort((a, b) => b[1] - a[1])
        .forEach(([category, count]) => {
            const percentage = (count / maxCount) * 100;
            
            const bar = document.createElement('div');
            bar.className = 'category-bar';
            bar.innerHTML = `
                <div class="category-label">${category}</div>
                <div class="category-bar-container">
                    <div class="category-bar-fill" style="width: ${percentage}%">
                        ${count}回
                    </div>
                </div>
            `;
            chartContainer.appendChild(bar);
        });
}

// データをエクスポート
function exportData() {
    const dataStr = JSON.stringify(searchAnalytics, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mki_welfare_analytics_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    alert('データをエクスポートしました！');
}

// データをクリア
function clearData() {
    if (confirm('本当にすべての検索データを削除しますか？この操作は取り消せません。')) {
        searchAnalytics = {
            searches: [],
            benefitCounts: {},
            categoryCounts: {}
        };
        saveAnalytics();
        updateAnalyticsDisplay();
        alert('データをクリアしました。');
    }
}

// モーダル操作関数
let currentBenefitId = null;

function openApplicationModal(benefitId = null) {
    const modal = document.getElementById('application-modal');
    const modalTitle = document.getElementById('modal-title');
    const benefitSelect = document.getElementById('selected-benefit');
    
    // プルダウンに福利厚生を追加
    populateBenefitSelect();
    
    if (benefitId) {
        currentBenefitId = benefitId;
        const benefit = benefitsDatabase.find(b => b.id === benefitId);
        modalTitle.textContent = `${benefit.icon} ${benefit.name} - 申し込み`;
        
        // 選択された福利厚生を設定
        benefitSelect.value = benefitId;
        benefitSelect.disabled = true;
    } else {
        modalTitle.textContent = '福利厚生の申し込み';
        benefitSelect.disabled = false;
        currentBenefitId = null;
    }
    
    modal.classList.add('show');
    
    // フォームをリセット（福利厚生選択以外）
    document.getElementById('applicant-name').value = '';
    document.getElementById('applicant-dept').value = '';
    document.getElementById('applicant-email').value = '';
    document.getElementById('applicant-phone').value = '';
    document.getElementById('application-notes').value = '';
}

function populateBenefitSelect() {
    const select = document.getElementById('selected-benefit');
    
    // 既存のオプションをクリア（最初の「選択してください」以外）
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    // 申し込み可能な福利厚生のみを追加
    const applicableBenefits = benefitsDatabase.filter(b => b.requiresApplication);
    
    applicableBenefits.forEach(benefit => {
        const option = document.createElement('option');
        option.value = benefit.id;
        option.textContent = `${benefit.icon} ${benefit.name}`;
        select.appendChild(option);
    });
}

function closeApplicationModal() {
    const modal = document.getElementById('application-modal');
    modal.classList.remove('show');
    currentBenefitId = null;
}

function showApplicationProcess(benefitId) {
    const benefit = benefitsDatabase.find(b => b.id === benefitId);
    const modal = document.getElementById('process-modal');
    const modalTitle = document.getElementById('process-title');
    const processContent = document.getElementById('process-content');
    
    modalTitle.textContent = `${benefit.icon} ${benefit.name} - 手続き方法`;
    
    if (benefit.applicationProcess) {
        let html = '<div class="process-steps">';
        
        benefit.applicationProcess.steps.forEach((step, index) => {
            html += `
                <div class="process-step">
                    <div class="step-number">${index + 1}</div>
                    <div class="step-text">${step}</div>
                </div>
            `;
        });
        
        html += '</div>';
        
        html += `
            <div class="process-info">
                <h4>📅 申請期限</h4>
                <p>${benefit.applicationProcess.deadline}</p>
            </div>
            <div class="process-info">
                <h4>📞 お問い合わせ先</h4>
                <p>${benefit.applicationProcess.department}</p>
            </div>
        `;
        
        if (benefit.applicationProcess.notes) {
            html += `
                <div class="process-info">
                    <h4>💡 注意事項</h4>
                    <p>${benefit.applicationProcess.notes}</p>
                </div>
            `;
        }
        
        processContent.innerHTML = html;
    } else {
        processContent.innerHTML = `
            <div class="process-info">
                <p>この福利厚生は申し込み不要です。詳細については人事部にお問い合わせください。</p>
            </div>
        `;
    }
    
    modal.classList.add('show');
}

function closeProcessModal() {
    const modal = document.getElementById('process-modal');
    modal.classList.remove('show');
}

function showBenefitInfo(benefitId) {
    const benefit = benefitsDatabase.find(b => b.id === benefitId);
    const modal = document.getElementById('process-modal');
    const modalTitle = document.getElementById('process-title');
    const processContent = document.getElementById('process-content');
    
    modalTitle.textContent = `${benefit.icon} ${benefit.name} - 詳細情報`;
    
    processContent.innerHTML = `
        <div class="process-info">
            <h4>📋 説明</h4>
            <p>${benefit.description}</p>
        </div>
        <div class="process-info">
            <h4>💰 支給額・内容</h4>
            <p>${benefit.amount}</p>
        </div>
        <div class="process-info">
            <h4>🏷️ カテゴリ</h4>
            <p>${benefit.category}</p>
        </div>
        <div class="process-info">
            <h4>📞 お問い合わせ</h4>
            <p>詳細については人事部までお問い合わせください。</p>
        </div>
    `;
    
    modal.classList.add('show');
}

// モーダル外クリックで閉じる
window.onclick = function(event) {
    const appModal = document.getElementById('application-modal');
    const procModal = document.getElementById('process-modal');
    
    if (event.target === appModal) {
        closeApplicationModal();
    }
    if (event.target === procModal) {
        closeProcessModal();
    }
}

// 申し込みフォーム送信
document.addEventListener('DOMContentLoaded', () => {
    const applicationForm = document.getElementById('application-form');
    
    if (applicationForm) {
        applicationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 選択された福利厚生IDを取得
            const selectedBenefitId = parseInt(document.getElementById('selected-benefit').value);
            if (!selectedBenefitId) {
                alert('福利厚生を選択してください。');
                return;
            }
            
            const benefit = benefitsDatabase.find(b => b.id === selectedBenefitId);
            const formData = {
                benefitId: benefit.id,
                benefitName: benefit.name,
                name: document.getElementById('applicant-name').value,
                department: document.getElementById('applicant-dept').value,
                email: document.getElementById('applicant-email').value,
                phone: document.getElementById('applicant-phone').value,
                notes: document.getElementById('application-notes').value,
                timestamp: new Date().toISOString()
            };
            
            console.log('申し込みデータ:', formData);
            
            alert(`${benefit.name}の申し込みを受け付けました！\n\n人事部より追って連絡いたします。\n申し込み内容がメールで送信されます。`);
            
            closeApplicationModal();
            
            // 福利厚生選択を再度有効化
            document.getElementById('selected-benefit').disabled = false;
        });
    }
});

// ドキュメントマップ機能
function initDocumentMap() {
    renderDocumentMap();
    
    // 検索機能
    const searchInput = document.getElementById('doc-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterDocumentMap);
    }
    
    // カテゴリフィルター
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterDocumentMap);
    }
    
    // 申し込みフィルター
    const applicationFilter = document.getElementById('application-filter');
    if (applicationFilter) {
        applicationFilter.addEventListener('change', filterDocumentMap);
    }
}

function renderDocumentMap(filteredBenefits = null) {
    const documentMap = document.getElementById('document-map');
    if (!documentMap) return;
    
    const benefits = filteredBenefits || benefitsDatabase;
    
    if (benefits.length === 0) {
        documentMap.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <div class="no-results-text">該当する福利厚生が見つかりませんでした</div>
                <div class="no-results-hint">検索条件を変更してお試しください</div>
            </div>
        `;
        return;
    }
    
    // カテゴリ別にグループ化
    const categorized = {};
    benefits.forEach(benefit => {
        if (!categorized[benefit.category]) {
            categorized[benefit.category] = [];
        }
        categorized[benefit.category].push(benefit);
    });
    
    let html = '';
    Object.keys(categorized).sort().forEach(category => {
        const categoryBenefits = categorized[category];
        html += `
            <div class="category-section">
                <div class="category-header" onclick="toggleCategory('${category}')">
                    <div class="category-title">
                        <h3>${category}</h3>
                        <span class="category-count">${categoryBenefits.length}件</span>
                    </div>
                    <span class="category-toggle" id="toggle-${category}">▼</span>
                </div>
                <div class="benefits-table" id="benefits-${category}">
                    ${categoryBenefits.map(benefit => createBenefitRow(benefit)).join('')}
                </div>
            </div>
        `;
    });
    
    documentMap.innerHTML = html;
}

function createBenefitRow(benefit) {
    const actionButtons = benefit.requiresApplication ? `
        <button class="btn-quick btn-quick-apply" onclick="openApplicationModal(${benefit.id})">申し込む</button>
        <button class="btn-quick btn-quick-info" onclick="showApplicationProcess(${benefit.id})">手続き</button>
    ` : `
        <button class="btn-quick btn-quick-info" onclick="showBenefitInfo(${benefit.id})">詳細</button>
    `;
    
    return `
        <div class="benefit-row" data-benefit-id="${benefit.id}">
            <div class="benefit-row-icon">${benefit.icon}</div>
            <div class="benefit-row-info">
                <div class="benefit-row-name">${benefit.name}</div>
                <div class="benefit-row-desc">${benefit.description}</div>
            </div>
            <div class="benefit-row-amount">${benefit.amount}</div>
            <div class="benefit-row-actions">
                ${actionButtons}
            </div>
        </div>
    `;
}

function toggleCategory(category) {
    const benefitsTable = document.getElementById(`benefits-${category}`);
    const toggle = document.getElementById(`toggle-${category}`);
    
    if (benefitsTable.style.display === 'none') {
        benefitsTable.style.display = 'grid';
        toggle.classList.remove('collapsed');
    } else {
        benefitsTable.style.display = 'none';
        toggle.classList.add('collapsed');
    }
}

function filterDocumentMap() {
    const searchInput = document.getElementById('doc-search');
    const categoryFilter = document.getElementById('category-filter');
    const applicationFilter = document.getElementById('application-filter');
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
    const selectedApplication = applicationFilter ? applicationFilter.value : 'all';
    
    let filtered = benefitsDatabase.filter(benefit => {
        // 検索フィルター
        const matchesSearch = !searchTerm || 
            benefit.name.toLowerCase().includes(searchTerm) ||
            benefit.description.toLowerCase().includes(searchTerm) ||
            benefit.category.toLowerCase().includes(searchTerm) ||
            benefit.keywords.some(kw => kw.toLowerCase().includes(searchTerm));
        
        // カテゴリフィルター
        const matchesCategory = selectedCategory === 'all' || benefit.category === selectedCategory;
        
        // 申し込みフィルター
        let matchesApplication = true;
        if (selectedApplication === 'required') {
            matchesApplication = benefit.requiresApplication === true;
        } else if (selectedApplication === 'not-required') {
            matchesApplication = benefit.requiresApplication === false;
        }
        
        return matchesSearch && matchesCategory && matchesApplication;
    });
    
    // 統計を更新
    updateDocumentStats(filtered);
    
    // マップを再描画
    renderDocumentMap(filtered);
}

function updateDocumentStats(filteredBenefits) {
    const total = benefitsDatabase.length;
    const filtered = filteredBenefits.length;
    const applicationRequired = benefitsDatabase.filter(b => b.requiresApplication === true).length;
    
    const totalEl = document.getElementById('total-benefits');
    const filteredEl = document.getElementById('filtered-benefits');
    const requiredEl = document.getElementById('application-required');
    
    if (totalEl) totalEl.textContent = total;
    if (filteredEl) filteredEl.textContent = filtered;
    if (requiredEl) requiredEl.textContent = applicationRequired;
}

// 初期化処理
document.addEventListener('DOMContentLoaded', () => {
    console.log('MKI 福利厚生ナビゲーターが起動しました（実際のMKI制度に基づく）');
    console.log(`登録されている福利厚生: ${benefitsDatabase.length}件`);
    console.log('カテゴリ: 給与、日常、住宅、業務、休暇、将来設計、ライフイベント、保険、健康、育児、レジャー');
    
    // 検索履歴を読み込み
    loadAnalytics();
    updateAnalyticsDisplay();
    
    // 分析タブのボタンイベント
    const exportBtn = document.getElementById('export-data');
    const clearBtn = document.getElementById('clear-data');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', exportData);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearData);
    }
    
    // 福利厚生データにデフォルト値を追加
    benefitsDatabase.forEach(benefit => {
        if (benefit.requiresApplication === undefined) {
            benefit.requiresApplication = false;
        }
        if (benefit.applicationProcess === undefined) {
            benefit.applicationProcess = null;
        }
    });
    
    // ドキュメントマップを初期化
    initDocumentMap();
});

