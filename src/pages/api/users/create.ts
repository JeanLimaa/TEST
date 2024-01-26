/**
 * @api {get} /api/users/create Create User
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que registre um usuário no array users
 * - A request deve receber apenas o método POST
 * - A request deve receber um body com os dados do usuário
 * - O body vai seguir a interface IUserCreate, removendo o id
 * - Você deve corrigir a interface IUserCreate em src/types/user.d.ts
 */

import { NextApiRequest, NextApiResponse } from "next/types";

import { IUser, IUserCreate } from "@/types/user.d";

const users: IUser[] = [];

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Valida o método da request
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  // Valida o body da request
  const body: IUserCreate = req.body;
  if (!body) {
    return res.status(400).json({ error: "Corpo da requisição inválido" });
  }

  const email: string = body.email;
  let userExists: boolean = false;

  users.map(user => {
    userExists = user.email === email; //verifica se o email já existe no Array;
  })

  if(userExists) {
    // Retorna que o e-mail ja está cadastrado
    return res.status(500).json({error: 'E-mail já cadastrado.'});
  }

  const name: string = body.name;
  const length: number = users.length;
  let id: number = length > 0 ? users[length - 1].id + 1 : 1; //pega o ultimo index e add + 1
  
  // Adiciona o usuário ao array
  const user: IUser = {
    id: id,
    email,
    name,
  };
  users.push(user);

  console.log(user);

  // Retorna o usuário criado
  return res.status(201).json(user);
};
