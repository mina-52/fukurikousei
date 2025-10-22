// 福利厚生データベース（MKI実際の制度に基づく）
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
        category: "給与"
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
        category: "休暇"
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
        category: "将来設計"
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
        category: "育児"
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
        category: "ライフイベント"
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
        category: "レジャー"
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
        category: "レジャー"
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
        category: "レジャー"
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
    card.className = 'benefit-card';
    card.innerHTML = `
        <div class="benefit-icon">${benefit.icon}</div>
        <h3>${benefit.name}</h3>
        <p>${benefit.description}</p>
        <div class="benefit-amount">${benefit.amount}</div>
        <span class="benefit-tag">${benefit.category}</span>
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
        response += `<span style="color: #667eea; font-weight: bold;">💰 ${benefit.amount}</span><br>`;
        response += `<span style="background: #e8ecff; color: #667eea; padding: 2px 8px; border-radius: 10px; font-size: 0.85em;">${benefit.category}</span><br><br>`;
    });
    
    response += `<br>詳細や申請方法については人事部までお問い合わせください。<br>他にもお探しのものがあればお気軽にお聞きください！`;
    
    return response;
}

// 初期化処理
document.addEventListener('DOMContentLoaded', () => {
    console.log('MKI 福利厚生ナビゲーターが起動しました（実際のMKI制度に基づく）');
    console.log(`登録されている福利厚生: ${benefitsDatabase.length}件`);
    console.log('カテゴリ: 給与、日常、住宅、業務、休暇、将来設計、ライフイベント、保険、健康、育児、レジャー');
});

