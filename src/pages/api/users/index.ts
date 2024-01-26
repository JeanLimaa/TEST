/**
 * @api {get} /api/users Read list
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que retorne uma lista de usuários
 * - A request deve receber apenas o método GET
 * - A lista deve conter pelo menos 2 usuários
 * - Cada usuário deve ter um id, nome e email
 * - Utilize a interface IUser para tipar os dados
 */

import { NextApiRequest, NextApiResponse } from 'next/types';

import { IUser } from '@/types/user.d';

//import { ApiMethod } from '@/decorators/method';

export default (req: NextApiRequest, res: NextApiResponse) => {
	const users: Array<IUser> = [];

	if(req.method === 'GET')
	{
		users.push(
			{
				id: 1,
				name: 'Jean',
				email: 'jeansantoslima17@gmail.com'
			},
			{
				id: 2,
				name: 'Glaucia',
				email: 'glaucia@gmail.com'
			}
		)
	} else {
		// return res.status(500).json({ok: false, message: O método precisa ser GET.'});
		throw new Error('O método precisa ser GET.');
	}

	return res.status(200).json(users); //código alterado para ok
};
