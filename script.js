// 福利厚生データベース
const benefitsDatabase = [
    {
        id: 1,
        icon: "💰",
        name: "住宅手当",
        description: "賃貸住宅にお住まいの方に月額最大3万円を支給します。",
        amount: "最大30,000円/月",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["住宅", "家賃", "引っ越し", "引越し", "賃貸"],
        category: "住宅"
    },
    {
        id: 2,
        icon: "💍",
        name: "結婚祝い金",
        description: "結婚された社員の方に祝い金を支給します。新生活のスタートを応援します。",
        amount: "50,000円",
        conditions: {
            minYears: 0,
            marital: "married",
            children: null
        },
        keywords: ["結婚", "婚姻", "入籍", "結婚式"],
        category: "ライフイベント"
    },
    {
        id: 3,
        icon: "👶",
        name: "出産祝い金",
        description: "お子様が誕生された際に祝い金を支給します。",
        amount: "第1子: 100,000円<br>第2子: 150,000円<br>第3子以降: 200,000円",
        conditions: {
            minYears: 0,
            marital: null,
            children: "yes"
        },
        keywords: ["出産", "子供", "赤ちゃん", "誕生", "生まれ"],
        category: "ライフイベント"
    },
    {
        id: 4,
        icon: "🏫",
        name: "育児支援手当",
        description: "未就学児をお持ちの社員に月額手当を支給します。",
        amount: "10,000円/月/子",
        conditions: {
            minYears: 0,
            marital: null,
            children: "yes"
        },
        keywords: ["育児", "子育て", "保育園", "幼稚園", "子供"],
        category: "育児"
    },
    {
        id: 5,
        icon: "🏥",
        name: "健康診断補助",
        description: "年1回の定期健康診断を全額会社負担で実施します。人間ドックも選択可能です。",
        amount: "全額補助",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["健康診断", "人間ドック", "検診", "健康", "医療"],
        category: "健康"
    },
    {
        id: 6,
        icon: "🏋️",
        name: "スポーツクラブ利用補助",
        description: "提携スポーツクラブの利用料を補助します。健康維持にお役立てください。",
        amount: "利用料の50%補助",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["スポーツ", "ジム", "フィットネス", "運動", "健康"],
        category: "健康"
    },
    {
        id: 7,
        icon: "📚",
        name: "資格取得支援制度",
        description: "業務に関連する資格の取得費用を全額補助します。",
        amount: "全額補助 + 合格祝い金",
        conditions: {
            minYears: 1,
            marital: null,
            children: null
        },
        keywords: ["資格", "勉強", "試験", "スキルアップ", "学習"],
        category: "キャリア"
    },
    {
        id: 8,
        icon: "✈️",
        name: "リフレッシュ休暇",
        description: "勤続5年ごとに特別休暇5日間と旅行補助金を支給します。",
        amount: "5日間 + 100,000円",
        conditions: {
            minYears: 5,
            marital: null,
            children: null
        },
        keywords: ["休暇", "旅行", "リフレッシュ", "バケーション"],
        category: "休暇"
    },
    {
        id: 9,
        icon: "🍱",
        name: "食事補助",
        description: "社員食堂やランチ代の一部を補助します。",
        amount: "5,000円/月",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["食事", "ランチ", "昼食", "社食"],
        category: "日常"
    },
    {
        id: 10,
        icon: "🚃",
        name: "通勤交通費",
        description: "通勤に必要な交通費を全額支給します。",
        amount: "全額支給",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["通勤", "交通費", "定期券"],
        category: "日常"
    },
    {
        id: 11,
        icon: "🎓",
        name: "子女教育手当",
        description: "お子様の教育費を支援します（小学校〜大学）。",
        amount: "10,000〜30,000円/月",
        conditions: {
            minYears: 1,
            marital: null,
            children: "yes"
        },
        keywords: ["教育", "学校", "大学", "学費", "子供"],
        category: "育児"
    },
    {
        id: 12,
        icon: "🏠",
        name: "持家支援制度",
        description: "住宅購入時の頭金や住宅ローンの利子補給を行います。",
        amount: "最大100万円補助",
        conditions: {
            minYears: 3,
            marital: null,
            children: null
        },
        keywords: ["住宅", "マイホーム", "持家", "家", "購入", "ローン"],
        category: "住宅"
    },
    {
        id: 13,
        icon: "🎉",
        name: "永年勤続表彰",
        description: "勤続10年、20年、30年の節目に表彰と記念品を贈呈します。",
        amount: "記念品 + 特別休暇",
        conditions: {
            minYears: 10,
            marital: null,
            children: null
        },
        keywords: ["勤続", "表彰", "記念"],
        category: "その他"
    },
    {
        id: 14,
        icon: "👨‍👩‍👧",
        name: "介護支援制度",
        description: "ご家族の介護が必要な場合の休暇や補助金制度です。",
        amount: "介護休暇 + 相談サービス",
        conditions: {
            minYears: 1,
            marital: null,
            children: null
        },
        keywords: ["介護", "家族", "親"],
        category: "ライフイベント"
    },
    {
        id: 15,
        icon: "💻",
        name: "在宅勤務手当",
        description: "在宅勤務に必要な環境整備費用を補助します。",
        amount: "5,000円/月",
        conditions: {
            minYears: 0,
            marital: null,
            children: null
        },
        keywords: ["在宅", "リモート", "テレワーク"],
        category: "日常"
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
                • 結婚、出産、育児<br>
                • 住宅、引っ越し<br>
                • 健康診断、スポーツ<br>
                • 資格、勉強<br>
                • 休暇、旅行`;
    }
    
    let response = `以下の福利厚生が利用できます：<br><br>`;
    
    matchedBenefits.forEach(benefit => {
        response += `<strong>${benefit.icon} ${benefit.name}</strong><br>`;
        response += `${benefit.description}<br>`;
        response += `<span style="color: #667eea; font-weight: bold;">💰 ${benefit.amount}</span><br><br>`;
    });
    
    response += `詳細については人事部までお問い合わせください。`;
    
    return response;
}

// 初期化処理
document.addEventListener('DOMContentLoaded', () => {
    console.log('MKI 福利厚生ナビゲーターが起動しました');
    console.log(`登録されている福利厚生: ${benefitsDatabase.length}件`);
});

