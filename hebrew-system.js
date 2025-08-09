/* ========================================
   SIMPLIFIED HEBREW TESTIMONIAL SYSTEM
   ======================================== */

/**
 * Simplified Hebrew Testimonial System for Mentorship Program
 * 
 * This system displays Hebrew testimonials with role-specific content
 * based on URL parameters (#manager or #guide).
 * 
 * Data Structure:
 * - name: Participant's Hebrew name
 * - generalTestimonial: Main testimonial text
 * - guideText: Specific text for guide (Tzvika) view
 * - managerText: Specific text for manager (Ron) view
 * - additionalInfo: Program details (duration, sessions, impact)
 * 
 * URL Parameters:
 * - #manager or #ron: Shows general testimonial + manager-specific text
 * - #guide or #tzvika: Shows general testimonial + guide-specific text
 * - Default: Shows English testimonials
 */

/* ========================================
   HEBREW UI TRANSLATIONS
   ======================================== */

const hebrewTexts = {
    
    // View modes
    managerView: 'תצוגת מנהל - רון',
    guideView: 'תצוגת מדריך - צביקה',
    generalView: 'תצוגה כללית',
    
    // Testimonial sections
    generalTestimonial: 'מה התוכנית הייתה עבורי?',
    managerTestimonial: 'כמה מילים עבור רון',
    guideTestimonial: 'כמה מילים עבור צביקה',
    
    // Stats labels
    completedIn: 'הושלם ב',
    
    // Error messages
    errorLoading: 'שגיאה בטעינת הנתונים',
    tryAgain: 'נסו שוב',
    
    // Loading states
    loadingData: 'טוען נתונים...',
    preparingContent: 'מכין תוכן...'
};

/* ========================================
   HEBREW TESTIMONIALS DATA STRUCTURE
   ======================================== */

/**
 * Hardcoded Hebrew testimonials data
 * Ready for you to populate with actual participant information
 */
const hebrewTestimonialsData = [
    {
        id: 1,
        name: 'איתי כהן',
        generalTestimonial: `התוכנית עבורי הייתה קפיצה ראש אל התודעה שלי 
הבנה של מנגנונים אוטומטיים ושינוי תפיסה רחב בכל מה שקשור להתנהגות שלי 
אני מרגיש שהתוכנית עיצבה עוד חלק מימני 
נתנה לי עוד כוח ופתחה לי את המחשבה לגבי דברים לא היו מודעים אצלי , 
הזכירה לי שוב מה הכוח של קבוצה !
העבודה שלנו על הדברים האלו לא נגמרת לעולם 
אבל זו עוד שכבה שהופכת אותי להיות יותר טוב, מאוזן ושלם  ."`,
        guideText: `"צביקה אתה מנחה מיוחד במינו 
ריתקת אותי בכל אחד מנושאים אליו דיברת, 
הרגשתי שאתה עוד אחד מהקבוצה, איתנו בגובה העיניים , 
נתת לי הרבה חומר למחשבה על החיים, 
עזרת לי מאוד לאזן חלקים בי שהיו לא שקטים 
ואתה עושה את זה תוך כדי שאתה מהווה דוגמה אישית למופת
תודה על הכל צביקה !! 
שיחות ארוכות, 
עצות וחיבורים עם אנשים, 
ניסיון אמיתי להבין איך מרגישה ונראית התמכרות וכל זה בלי שנייה שאני מרגיש לא נעים 
זו יכולת נדירה מאוד ואני ממש שמח שאתה ממשיך להיות שם עבור עוד אנשים בתוכנית

      
אתה באמת ניכנסת לי ללב הכי עמוק שאפשר 
אוהב אותך מאוד והרבה בהצלחה בהמשך הדרך ! ❤️`,

        managerText: `רון אתה ללא ספק איש הצללים של התוכנית 
דואג להכל שלא יחסר לנו שום דבר, 
אהבתי מאוד שאתה גם לוקח חלק מהתוכנית 
משתף חוויות אישיות ומעלה מחשבות 
ולזה נתן המון לתוכנית 
תודה רבה על השיחות הטובות, שהרמת אותי שהייתי צריך ופשוט היית שם ..   
אוהב אותך המון ושמח עבור המחזור הבא שיש לו אותך `
    },
    {
        id: 2,
        name: 'דניאל דואניאס',
        generalTestimonial: `מקום כיף להיפגש עם אנשים טובים ולעשות צחוקים.
חלל שופע במטאפורות ואבסטרקציות עם שטפונות, סירי פוייקה עם כפיות ארוכות וקנו.
מגרש בטוח להיפתח המאפשר להיות פגיע.
זמן להתעסק בדברים עמוקים ושורשיים שלא נוגעים בהם ביום יום.
דרך משמעותית להעמיק את ההיכרות שלי עם עצמי ועם מערכת ההפעלה שלי.
כלים מעניינים וחדשים (כולל הוראות הפעלה) לארגז שלי.
`,
        guideText: `עוד בראיון הראשון לתכנית הקודמת יצאתי בתחושה מהשיחה איתך שאני לא מקרה מספיק טוב לתכנית. גם בראיון לתכנית הזאת, אותה תחושה וכמובן גם במהלך התכנית בכל מיני נקודות... במהלך התכנית לאט לאט התבהר לי שהתחושה הזאת היא שלי על עצמי וכנראה שנובעת מהפריזמות דרכן אני רואה ומודד את העולם ואותי. הדחף הלא נשלט להתאים למשבצת ולהיות בה הכי טוב, גם אם היא לא בהכרח המשבצת שמתאימה לי זה פרט מידע כל כך משמעותי על עצמי שאני בטוח שילווה אותי בהרבה צמתים בהמשך החיים. 
ההנחיה שלך יצרה אווירה פתוחה של שיתוף בלי שיפוט, מאפשרת להיכנס ומגנה על השוכנים בה. היה מדהים להיות חלק מהקבוצה שיצרת ומהתהליך שהעברת.`,
        managerText: `שמע.. אין לי מילים! (ואני יודע שזה סותר את המשמעות של המשפט, אבל בכל זאת כמה מילים). אתה אחד התותחים שאני מכיר. נתחיל מהיותר ברור לעין - רמת התפעול השוטף של התכנית והמנהלות שתיקתקת ובאמת נתת לנו להרגיש אפס רעש מעטפת ונטו זמן לעבוד זה כל כך לא מובן מאליו ורציתי להגיד לך תודה ענקית על זה. מעבר לזה, אני מרגיש שהוספת כל כך הרבה למעגלים ולשיח וניכר שאתה כבר מנוסה ושרוח הצביקה הגיע גם אליך. היה לי ממש כיף לראות אותך מדבר ומעיר ומאיר ומשתתף ואומר דברים כל כך נכונים ומדוייקים ובמקום וגם מגיש את זה באופן שלשאר יהיה קל ונוח לקבל את זה. כל התהליך הזה לא היה שלם בלעדיך וכל הזמן שהשקעת עבורינו מוערך ברמות שאין לתאר.
וחשוב לא פחות, אתה הפסדת לי בבאולינג.
קבל מאבא טרי לאבא לעתיד בדיחת אבא שתהיה רק שלך:
מהרגע שיש לך ילד ואתה אבא באופן רשמי, כל דבר שתקנה תוכל להגיד שהוא על חשבון הברון (אבא-רון).
אוהב המון ומעריך אפילו יותר ❤️`,
    },
    {
        id: 3,
        name: 'עומרי מאור',
    
        generalTestimonial: `התכנית לימדה אותי שניתן ואף רצוי להרים את הראש במהלך שגרת החיים שרצה מכוח האינרציה, ולבחון אפשרויות אחרות אשר עשויות לענות על רצון אמיתי שלי, ולא רצון הנועד לאפשר את המשך הריצה ה"תקינה" והרגילה של החיים כפי שהוכתבו לי מבחוץ. למדתי יותר על מה מוציא אותי מאיזון ומה מחזיר אותי אליו, ובעיקר זכיתי לחוות הכל לצד אנשים מדהימים עם פוטנציאל שלא נגמר. על אף האתגרים שצצו מהמציאות בתקופה האחרונה עבורי, לקחתי המון כלים וחומר למחשבה להמשך. תודה!`,
        guideText: `אתה בראש שלי המגה-מנטור של התכנית, מקור הידע ומי שיודע להעביר את תורתו בכל שפה ותדר. ההירתמות הכנה שלך לאנשים ולתכנית אינה מובנת מאליה כלל עבורי, ורכשתי המון רגעים מכוננים וזכרונות לצידך לאורך התכנית. אני מאחל לך שתמשיך לאהוב כל כך את מה שאתה עושה ולהצטיין בו, ושמכאן לא יהיה "שופט בן ****" שמשנה את חוקי המשחק, אלא הכל ירוץ ללא הפרעות. בהערכה רבה, עמרי`,
        managerText: `קשה לזקק מה כדאי לכתוב פה מתוך מכלול המחשבות וההערכה שיש לי אליך. תמיד היית עבורי דוגמה למנהיג עוצמתי בלי המון דיבורים (חוץ מבהקלטות בוואצאפ), ומאז אותה שבת לקחת על עצמך למלא לצוות שלנו חלק מחלל עצום שנפער. התכנית הייתה הזדמנות יקרה מפז עבורי לעבור תהליך משמעותי כל כך בליווי שלך, ואני מודה על כל רגע ומעריך את הסבלנות וההקשבה האינסופית שלך. אין ספק שיורשת העצר שבדרך זכתה..`,
    },
    {
        id: 4,
        name: 'יובל בר אילן',
        generalTestimonial: 'התכנית הייתה מתנה מהעמותה, מקום לעצור ולחשוב , לקבל עד נקודת מבט על החיים.',
        guideText: 'כיף לראות אותך נמצא במקום מושלם עבורך, בכל פעם ראיתי את הרצון האינסופי לעזור ואהבת האדם אצלך. תודה רבה על הכל!',
        managerText: `רון אתה פשוט מלך! תודה ענקית על זה שאתה תמיד שם לעזור ולדאוג להכל, תמיד היה כל מה שצריך מועבר.
זכינו בך בתוכנית ובעמותה!`,
    },
    {
        id: 5,
        name: 'יהונתן יצחקוב',
        generalTestimonial: `עבורי, תוכנית המנטורים הייתה מסע של למידה, התפתחות והשראה. היא נתנה לי כלים מעשיים, ביטחון עצמי ותובנות חדשות, אבל לא פחות חשוב – היא העניקה לי חוויות אנושיות נעימות, קשרים חדשים ותמיכה אמיתית. זו הייתה הזדמנות לראות את עצמי ואת היכולות שלי מזווית חדשה ומעצימה`,
        guideText: `צביקה היקר,

אני רוצה  להודות לך מעומק הלב על הזמן, ההשקעה והידע ששתפת איתנו לאורך הדרך. התרומה שלך לקבוצה, וגם לי באופן אישי, היא עצומה ומשמעותית.

המקצועיות שלך, הסבלנות והנכונות להסביר ולכוון נתנו לנו לא רק כלים ומידע, אלא גם השראה ורצון להתפתח. התמיכה שלך יצרה אווירה חיובית, למידה פורה ותחושת שותפות אמיתית.

אני מעריך מאוד את כל מה שנתת, ומודה לך על הלב הרחב והאנרגיה שהשקעת בנו.

תודה רבה 
`,
        managerText: `תודה רבה על הליווי הזמן והנוכחות שלך בתוכנית למרות שאתה לא מנטור רשמי או איש מקצוע, הצלחת לתת לי תחושת ביטחון ותמיכה אמיתית – בדיוק כמו אח גדול. הנוכחות שלך, האוזן הקשבת והאכפתיות שלך עשו  הבדל גדול, ואני מעריך את זה מאוד 
תודה מכל הלב `,
    },
    {
        id: 6,
        name: 'עידן פיטר',
        generalTestimonial: `עבורי התוכנית הייתה מקום להתנתק מפרקטיקת היום יום, לעצור ולחשוב גם על ההווה דרך העבר וגם על העתיד דרך ההווה . שתי הפלטפורמות, גם כולנו ביחד, וגם עם למפרט , איפשרו התפתחות אישית וקבוצתית . בעיני תוכנית מדהימה ומפתחת, ממש פריוליגיה למי שמתאים . `,
        guideText: `צביקה יקר, תודה גדולה על ההשקעה בנו. ניכר שאתה מטפל מהלב . אישית לקחתי ממך מעט מהגישה הטיפולית , ואתה מלווה אותי תוך כדי היום יום בתור מטפל. `,
        managerText: `רון, כמו שכבר כתבתי לכם, אני וצוות נגרי משוחדים, כי עוד לפני התוכנית אתה איש חשוב ומוערך מאוד בחיים שלי . אתה ממש איש הצללים של התוכנית, כיאה לכך שאתה הסמל האגדי של היחידה, הכל תקתק ודפק כמו שעון שוויצרי . אבל בינינו כמה שמאחורי הקלעים חשוב , זה לא העיקר. העיקר הוא שאתה איש יוצא דופן, פרקטי ועם זאת כל כך עמוק ובעל כל כך הרבה רבדים . הנעת לא פחות מצביקה אותנו ואת התוכנית . אתה ממשיך להיות עבורי אישיות חשובה ומרכזית בחיים . והקטניצ'יק או הקטנצ'יקית שהולכים להגיע יזכו באבא הכי הכי שיש בעולם . `,
    },
];

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

/**
 * Generates Hebrew initials from name
 * @param {string} name - Hebrew name
 * @returns {string} - Hebrew initials
 */
function generateHebrewInitials(name) {
    if (!name) return 'משתתף';
    
    const words = name.split(' ');
    if (words.length >= 2) {
        return words[0].charAt(0) + words[1].charAt(0);
    }
    return name.charAt(0) + (name.charAt(1) || name.charAt(0));
}

/**
 * Gets testimonial text based on view mode
 * @param {Object} participant - Participant data
 * @param {string} viewMode - 'manager', 'guide', or 'general'
 * @returns {string} - Complete testimonial text
 */
function getHebrewTestimonialText(participant, viewMode) {
    let text = participant.generalTestimonial || '';
    
    if (viewMode === 'manager' && participant.managerText) {
        text += '\n\n' + participant.managerText;
    } else if (viewMode === 'guide' && participant.guideText) {
        text += '\n\n' + participant.guideText;
    }
    
    return text;
}

/**
 * Gets preview text (truncated general testimonial)
 * @param {Object} participant - Participant data
 * @param {number} maxLength - Maximum length for preview
 * @returns {string} - Preview text
 */
function getHebrewPreviewText(participant, maxLength = 150) {
    const fullText = participant.generalTestimonial || '';
    return fullText.length > maxLength ? fullText.substring(0, maxLength) + '...' : fullText;
}

/**
 * Validates Hebrew testimonial data
 * @param {Array} testimonials - Array of testimonial objects
 * @returns {Array} - Validated testimonials
 */
function validateHebrewTestimonials(testimonials) {
    return testimonials.filter(testimonial => {
        return testimonial.name && 
               testimonial.generalTestimonial && 
               (testimonial.guideText || testimonial.managerText);
    });
}

/* ========================================
   DATA ACCESS FUNCTIONS
   ======================================== */

/**
 * Gets all Hebrew testimonials
 * @returns {Array} - Array of Hebrew testimonial objects
 */
function getHebrewTestimonials() {
    return validateHebrewTestimonials(hebrewTestimonialsData);
}

/**
 * Gets Hebrew testimonial by ID
 * @param {number} id - Testimonial ID
 * @returns {Object|null} - Testimonial object or null
 */
function getHebrewTestimonialById(id) {
    return hebrewTestimonialsData.find(testimonial => testimonial.id === id) || null;
}

/**
 * Gets Hebrew testimonials for specific role
 * @param {string} role - Role to filter by
 * @returns {Array} - Filtered testimonials
 */
function getHebrewTestimonialsByRole(role) {
    return hebrewTestimonialsData.filter(testimonial => 
        testimonial.role && testimonial.role.includes(role)
    );
}

/* ========================================
   EXPORT FOR MAIN APPLICATION
   ======================================== */

// Export functions and data for use in main script
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = {
        hebrewTexts,
        hebrewTestimonialsData,
        generateHebrewInitials,
        getHebrewTestimonialText,
        getHebrewPreviewText,
        validateHebrewTestimonials,
        getHebrewTestimonials,
        getHebrewTestimonialById,
        getHebrewTestimonialsByRole
    };
} else {
    // Browser environment - attach to window
    window.HebrewSystem = {
        hebrewTexts,
        hebrewTestimonialsData,
        generateHebrewInitials,
        getHebrewTestimonialText,
        getHebrewPreviewText,
        validateHebrewTestimonials,
        getHebrewTestimonials,
        getHebrewTestimonialById,
        getHebrewTestimonialsByRole
    };
}

console.log('Hebrew System loaded successfully');