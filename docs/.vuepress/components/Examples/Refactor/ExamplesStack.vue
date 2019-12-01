<template>
    <div>
        <WCartesian :dataset="dataset">
            <WBar stackId="myGroup" datakeyY="lap1" />
            <WBar stackId="myGroup" datakeyY="lap2" />
            <WBar stackId="myGroup" datakeyY="lap3" />
            <WBar stackId="myGroup" datakeyY="lap4" />
            <WBar stackId="myGroup" datakeyY="lap5" />
            <WStacked stackId="myGroup1">
                <WBar datakeyY="lap1" />
                <WBar datakeyY="lap2" />
                <WBar datakeyY="lap3" />
                <WBar datakeyY="lap4" />
                <WBar datakeyY="lap5" />
            </WStacked>
            <WXAxis type="categorical" datakey="team" />
            <WYAxis />
        </WCartesian>
    </div>
</template>

<script>
export default {
    name: 'ExamplesStack',
    data () {
        return {
            dataset: [
                { team: 'Seat', lap1: 37, lap2: 38, lap3: 36, lap4: 39, lap5: 37 },
                { team: 'Chevrolet', lap1: 32, lap2: 33, lap3: 31, lap4: 32, lap5: 33 },
                { team: 'Nissan', lap1: 35, lap2: 36, lap3: 33, lap4: 35, lap5: 37 },
            ],
        }
    }
}
</script>
