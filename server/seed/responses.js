const faker = require('faker')
const Response = require('../models/response');
const Question = require('../models/question')
const User = require('../models/user')
const {callWatson} = require('../services/watson')
const { mongoConnection } = require('../services/mongodb')

const randomWordsArr = [
  'work',
  'culture',
  'trust',
  'responsibility',
  'knowledge',
  'ability',
  'client',
  'manager',
  'colleague',
  'coworkers',
  'strategy',
  'structure',
  'diversity',
  'leadership',
  'job',
  'role',
  'cruel',
  'position',
  'style',
  'organizational',
  'corporate',
  'customers',
  'clients',
  'vendors',
  'quality',
  'product',
  'dead',
  'time',
  'results',
  'outcomes',
  'money',
  'imperfect',
  'profit',
  'grim',
  'diversity',
  'callous',
  'support',
  'development',
  'professional',
  'goals',
  'idea',
  'achievements',
  'creativity',
  'creative',
  'anxious',
  'respect',
  'abysmal',
  'appreciate',
  'behavior',
  'healthy',
  'missing',
  'workplace',
  'environment',
  'power',
  'flexibility',
  'exciting',
  'innovative',
  'opportunity',
  'ownership',
  'freedom',
  'difference',
  'contribute',
  'menacing',
  'ethical',
  'communication',
  'frighten',
  'filthy',
  'dreadful',
  'lead',
  'feedback',
  'insidious',
  'manage',
  'affect',
  'effect',
  'interactions',
  'understand',
  'opinion',
  'act',
  'actions',
  'bemoan',
  'communicate',
  'ignored',
  'future',
  'feature',
  'criminal',
  'reaction',
  'react',
  'improve',
  'example',
  'satisfaction',
  'help',
  'performance',
  'evaluation',
  'hard',
  'overworked',
  'overtime',
  'exercise',
  'engaged',
  'training',
  'business',
  'belligerent',
  'enraged',
  'faulty',
];

const body = `Google is a world of its own. At every other company, there were lots of people who had serious gaps in their skills. At Google, I could have a serious work conversation about technology with everyone and could trust that they have solid expertise. In that way, Google is a sheltered garden from the rest of the world.
There is a general sense of trust in the company. You can leave your valuables and laptops lying around, and they are safe. People joke that it's the only place where you use an expansive laptop to reserve a seat at the cafeteria, while walking away. At other companies, teams are very protective of their own code. Trying to execute another team's code requires following a 50 step installation process that's out of date and was never complete to begin with. Google has almost all the code in the same source repository. An engineer can look at the code, easily execute the code because it comes with intelligent defaults and standard build process, and contribute enhancements/bug fixes. The other teams are generally grateful for getting improvements. They understand that it's better for the company if the bug is fixed rather than holding onto territory or insisting on their own strange ways. Google takes care of you all around. From food, health care, generous vacation, onsite gym, and so on, you are well taken care off and can focus on work rather than dealing with life's hassles. There are cases where Google goes above and beyond tremendously. Here is an example that floats around internally. A Googler had worked at Amazon before. Amazon relocated him. Because of the relocation, he had to change his partner's health insurance for some critical and expensive life changing medication. Due to same sex partner and relocation, the health insurance company refused. Amazon was so unhelpful that the HR representative who was forced to deliver the news broke down crying and then quit over it. He switched to Google. The Google HR department negotiated an exception for him with the health insurance and included the necessary change for the following policy year for all employees. A lot of Google products have a huge impact with over a billion users. Working there, you can feel that you change the world. I was very happy with the compensation. There are also a lot of opportunities in the company to follow your interest. Pretty much anyone can get an intern, participate in setting coding standards (obviously you have to argue the case for your proposals), interviewing, supporting local schools with tech expertise. Google opened up a lot of opportunities in the community or in general in tech to volunteer in. Google is considered the largest functioning anarchy. That has its good sides, like the glee of joy for operating without strict oversight. It also has its dark side, like a hands-off management tends to encourage politics. Another beauty for engineers are internal tools. Your development environment is in the cloud. You can sit down at a loaner computer and be productive within seconds. There is a massive cloud compiling system that shards your compiles across many computers in the cloud. The search function across the codebase is powerful. You'll feel that downloading and compiling code on your own computer in your IDE is something of another epoch, like something from before the industrial revolution. The Google badge is a wonderful thing to carry. It opens doors to a different world. The office spaces are beautiful with work, rest, and play areas. The MTV location is like a utopian city on its own. Everything in it, food, drinks, work spaces, swimming pools, gym, bowling alleys, showers, and so on are free (for employees). It is a whole world of its own. Most companies have a one-over-one promotion model. Your boss has to decide to promote you. Your bosses boss has to sign off on it. At Google, the promotion is decided by a relatively impartial committee that due to promoting lots of people has experience in it. You can even get promoted in rare cases against the will of your manager. Rumor has it that managers won't hold a grudge if that happens but support it. The hiring committee looks at a promotion packet that includes reviews from peers. There can even be unrequested peer reviews. In general, it creates an environment that discourages bicycling - bowing to the higher ups and kicking the lower downs hard. However some people have realized that they can hurt colleagues with bad reviews and impunity. It's rare, but colleagues careers took a dive due to someone holding a grudge or simply writing a thoughtless review. (There is some concern about stack ranking, but I don't understand enough of the background to comment on it. There are plenty of discussions with insight elsewhere.) To underscore how Google is one of a kind, there is an internal database with legendary things that happened at Google. Someone parked his car for many years on the employee parking lot. When after years, he went looking for his car, it was gone. He went to security. He found out that it was simply moved because the parking lot had been repaved. Another Googler lived in the office fulltime to save money on rent. He wrote a guide on how to do that. As there are showers and other facilities, it is possible to do so. And Google let it happen. After a while of saving rent payment, he could afford the down payment on buying his own place. All these stories make Google a wonderful place to work at. An important topic to bring up is work/life balance. Work/life balance is an amorphous topic that means a lot of different things to different people. Getting up to speed at Google is consuming. Depending on your work, it could take a year to become productive. Many colleagues reported no longer having a personal life after starting at Google. Some colleagues simply love technology and can't think of anything better than working until the AM hours on some tech that gets them excited. You can tell these people by physically looking at them. For them, it is a heaven. If you are a balanced person with personal interests and relationships, you are likely going to be challenged. If you signed up for one of the big five tech companies, you wanted challenge, right. If I would do something differently, it is to take advantage of all time saving things. Pay for a laundry service. Pay for a cleaning service. I've had a moral hangup about doing that because on a moral level, my time shouldn't be more worthy than that of another human being. If I could do it all over again, I'd pay for every possible service to save time. In the grander scheme of things, if you work at Google, your skill is so valuable to humanity that you should make use of it instead of standing in line at the grocery store. I don't mean that in an arrogant way. If you work on a service with a billion users, your ability to make life better for them with another hour of work is worth more than folding laundry. You've paid the price in education, training, and effort to be able to do that. Make use of your power for the great code. (The view that all those perks are only there to keep your nose closer to the grindstone is the wrong way of looking at it from a philosophical point, in my humble opinion.) For full disclosure, there are some people who coast at Google. They probably don't have any complains about work/life balance or perhaps the worst complaints because they are all about coasting. Many company mishandle projects. When the next time comes around, they mishandle it in the same way because the people responsible aren't the ones working late nights and weekends. Google does two things to get better: (1) There are honest and public postmortems. They are the pride of a lot of true engineers. (2) Zeitgeist is an annual survey about the work place and the company. The survey is quite exhaustive. Every manager from the CEO to the front-line manager reports on the result of his/her area. Then they take actions to attempt to improve areas that got low scores. Having worked at companies where now improvement effort is done, this annual and systematic process is very refreshing. If you don't work in MTV (HQ), you will be given work. However if you are passionate and want to advance your career, you should relocated to MTV. Any project that started doing well and getting important seemed to get transferred there. Promotion opportunities are better there. It seemed that everyone who relocated from another location to MTV, was a lot happier. Officially, the company focuses on impact. In practice, it seems to focus on being highly productive in producing code, but not necessarily in actually succeeding. In theory, if you have a simple idea that doubles the revenue/customer satisfaction, it should be more appreciated than an idea that took a lot of effort/difficulty and had less improvement. But it tends to be the other way. Promotions tend to be tied to launching a project that makes peers at a higher level happy. That's often easier with an API that happens to be really useful for peers than launches that benefit users. Landing the right kind of project to work on is a big factor of getting a promotion, which is easier in MTV and also encourages politics. A colleague was told directly from his boss that he has to get better at "turf war." A general rule of thumb is that everyone ends up in ads. Non-ads projects tend to be more volatile and have a tendency to end with people ending up on ads projects. This is not necessarily a con. One should simply prepare for it. There seems to be a general trend as Google gets larger (60K+ employees) and the founders are withdrawing their impact on the company that Google's specialty is fading a bit. Microkitchens stock less eye popping snacks and drinks. The Christmas gift went from a nice bundle of cash to a coveted phone to a cheap phone to simply a donation to a charity of your choice. The hiring bar seems to get lowered to satisfy the need to hire more people. Managers tend to become managers for their tech skills and not management skills. It definitely shows in the quality of management. Very smart people, very technically capable, not so business and people savvy. This is not necessarily a complete con because a manager without a clue in tech is definitely a lot worse. There are some stars that people belief that Google still has but doesn't. The myth of 20% time is alive outside of Google. It's discouraged inside of Google. The only person whom I knew to participate in 20% time did so by working on another team, which he wanted to test out before transferring. Outside people belief that 1 day a week a Google can work on anything he/she deems interesting. Management doesn't outright deny it, but it's formulated as: If you work 20% time on something else, it has to have company impact worth 20%. This is not necessarily a con. It's more like a missing pro. Another shining star that's gone is the "don't be evil" motto. It was silently dropped and replaced with "do the right thing." Google didn't turn overnight evil. There is some philosophical case to be made why the new motto is better. However it seems with the founders drawing back from company involvement that the dramatic standing up for users of the old times is also fading. Google is still a far cry from Monsanto. If you work there and want to advance your career, don't volunteer for anything. It is kind of viewed as a "vacation" if you volunteer for things. For example at other employers, interviewing was viewed as a prestigious activity reserved for the most trusted employees to shape the future. At Google, any hour you spend interviewing means missing an hour to increase your performance score. You'll be rewarded for finding ways to dug out of the interviewing responsibility. Again this is not necessarily a con, simply something to understand. You are going to meet some of the brightest and most brilliant people. You are going to meet people with interesting backgrounds. You are going to have wonderfully engaging conversations. But all of that intelligence tends to also have caused nature to create that intelligence at a trade-off (in some people). Perhaps a lack of humanity or emotion was the price of it in some people. You are going to have some lunch conversations that are going to make you spit your food back out, like a colleague seriously proposing to use nuclear bombs to solve social issues. I sometimes felt the need to take a break from the office to be around people who display normal emotions (or any emotion). While the general office culture is very liberal/progressive, there are some pockets of social beliefs that are breathtaking to how little they care about human life or different lifestyles/opinions out of some law of the strong or ultra libertarian reasoning. Promote managers into management for their manager skills. Train manager in managing skills (both business and people managing skills). Focus more on the user. It seems that OKRs are more focused on internal metrics than actually understanding the user and making them happy. Roll back the trend towards becoming a regular company.`

const {getRandomDateInRange} = require('random-date-generator')

const randomResString = () => {
  return getRandomSubset(randomWordsArr).join(' ');
};

const getRandomSubset = (array, count) => {
  if (typeof count !== 'number') {
    count = faker.random.number({ min: 1, max: 10 });
  } else if (count > array.length) {
    count = array.length;
  } else if (count < 0) {
    count = 0;
  }

  const arrayCopy = array.slice();
  const countToRemove = arrayCopy.length - count;
  for (let i = 0; i < countToRemove; i++) {
    const indexToRemove = faker.random.number({ max: arrayCopy.length - 1 });
    arrayCopy.splice(indexToRemove, 1);
  }

  return arrayCopy;
};


const getRandomIntInclusive = limit => Math.floor(Math.random() * limit) + 1

const randomPolarRes = () => faker.random.arrayElement(['yes', 'no'])

const randomResponse = (question, user) => {
  const responseConfig = {
    date: getRandomDateInRange((new Date(2019, 0, 1)), (new Date(2019, 2, 1))),
    questionText: question.question,
    questionId: question._id,
    userSlackId: user.slackId,
    userId: user._id
  }
  if (question.responseType === 'polar') {
    responseConfig.polarResponse = randomPolarRes()
  } else {
    responseConfig.rateResponse = getRandomIntInclusive(5)
  }
  return new Response(responseConfig)
}

const seedResponses = async (text) => {
  try {
    await mongoConnection

    const questions = await Question.find({})

    const users = await User.find({})

    const fixedQuestions = questions.filter(q => q.responseType !== 'text')

    for (let fixedQ of fixedQuestions) {
      const limit = getRandomIntInclusive(10)
      for (let i = 0; i < limit; i++) {
        await randomResponse(fixedQ, faker.random.arrayElement(users)).save()
      }
    }

    const textQuestions = questions.filter(q => q.responseType === 'text')

    const responses = text.split('. ')

    for (let response of responses) {
      const randomQuestion = textQuestions[Math.floor(Math.random() * textQuestions.length)]
      const randomUser = users[Math.floor(Math.random() * users.length)]
      await callWatson(response, getRandomDateInRange((new Date(2019, 0, 1)), (new Date(2019, 2, 1))), randomQuestion, randomUser)
    }

  } catch (err) {
    console.error(err)
  }
}

seedResponses(body)
