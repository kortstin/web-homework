const graphql = require('graphql')
const Transaction = require('../data-models/Transaction')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLFloat, GraphQLNonNull } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const TransactionType = require('./transaction-type')

const updateTransaction = async req => {
  try {
		const id = req.params === undefined ? req._id : req.params._id
		const updateData = req.params === undefined ? req : req.params
		const update = await TransactionModel.findByIdAndUpdate(id, updateData, { new: true })
		return update
	} catch (err) {
		throw err;
	}
}

const removeTransaction = async req => {
  try {
		const id = req.params === undefined ? req._id : req.params._id
		const remove = await TransactionModel.findByIdAndRemove(id)
		return remove
	} catch (err) {
		throw err;
	}

}

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { user_id, description, merchant_id, debit, credit, amount }) {
        return (new TransactionModel({ user_id, description, merchant_id, debit, credit, amount })).save()
      }
    },
    editTransaction: {
			type: TransactionType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) },
				user_id: { type:(GraphQLString) },
				description: { type:(GraphQLString) },
        		merchant_id: { type: GraphQLString },
				debit: { type:(GraphQLBoolean) },
				credit: { type:(GraphQLBoolean) },
				amount: { type:(GraphQLFloat) }
			},
			async resolve(parent, args) {
				const data = await updateTransaction(args)
				return data
			}
		},
    removeTransaction: {
			type: TransactionType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) }
			},
			async resolve(parent, args) {
				const data = await removeTransaction(args)
				return data
			}
		}
  }
})

module.exports = mutation
