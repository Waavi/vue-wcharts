export function randomFruitsDataset ({ variance = 0.25 } = {}) {
    const nearTo = x => Math.round(x * (1 + variance * (Math.random() - 0.5)))
    return [
        {
            month: 'Jan', apples: nearTo(3840), bananas: nearTo(1020), platanos: nearTo(900), pears: nearTo(2780), cherries: nearTo(960),
        },
        {
            month: 'Feb', apples: nearTo(1600), bananas: nearTo(840), platanos: nearTo(600), pears: nearTo(1450), cherries: nearTo(960),
        },
        {
            month: 'Mar', apples: nearTo(640), bananas: nearTo(600), platanos: nearTo(360), pears: nearTo(540), cherries: nearTo(640),
        },
        {
            month: 'Apr', apples: nearTo(320), bananas: nearTo(300), platanos: nearTo(180), pears: nearTo(380), cherries: nearTo(640),
        },
        {
            month: 'May', apples: nearTo(280), bananas: nearTo(150), platanos: nearTo(90), pears: nearTo(350), cherries: nearTo(530),
        },
    ]
}
