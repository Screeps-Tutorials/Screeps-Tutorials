var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var sources = creep.room.find(FIND_SOURCES)

        const closestSource = creep.pos.findClosestByRange(sources)

        if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestSource, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    }
};

module.exports = roleHarvester;