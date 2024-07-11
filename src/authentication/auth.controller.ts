import { Request, Response } from 'express'
import authRepository from './auth.repository'
import { responseSucceed, responseFailed, responseStatus } from '@/exceptions'


export default class AuthController {


  async findOne(request: Request, response: Response) {
    try {
      const auth = await authRepository.findOne(request)

      return responseStatus(response, 200, responseFailed(auth))
    } catch (err) {
      return responseStatus(response, 500, responseFailed('Some error occurred while retrieving tutorials.'))
    }
  }

  async findAll(request: Request, response: Response) {
    try {
      const auth = await authRepository.findAll(request)

      return responseStatus(response, 200, responseSucceed(auth))
    } catch (err) {
      return responseStatus(response, 500, responseFailed('Some error occurred while retrieving tutorials.'))
    }
  }

  async signIn(request: Request, response: Response) {

    try {
      const auth = await authRepository.signIn(request)
      return responseStatus(response, 200, responseSucceed(auth))
    } catch (err) {
      response.status(500).json(responseFailed('Some error occurred while retrieving tutorials.'))
    }
  }

  async create(request: Request, response: Response) {

    try {
      const auth = await authRepository.create(request)

      return responseStatus(response, 200, responseSucceed(auth))
    } catch (err) {
      response.status(500).send(responseFailed('Some error occurred while retrieving tutorials.', 500))
    }
  }

  async update(request: Request, response: Response) {

    try {
      const auth = await authRepository.update(request)

      return responseStatus(response, 200, responseSucceed(auth))
    } catch (err) {
      return responseStatus(response, 500, responseFailed('Some error occurred while retrieving tutorials.'))
    }
  }

  async delete(request: Request, response: Response) {

    try {
      const auth = await authRepository.create(request)

      return responseStatus(response, 200, responseSucceed(auth))
    } catch (err) {
      return responseStatus(response, 500, responseFailed('Some error occurred while retrieving tutorials.'))
    }
  }

  // async findOne(req: Request, res: Response) {
  //   const id: number = parseInt(req.params.id)

  //   try {
  //     const tutorial = await tutorialRepository.retrieveById(id)

  //     if (tutorial) res.status(200).send(tutorial)
  //     else
  //       res.status(404).send({
  //         message: `Cannot find Tutorial with id=${id}.`
  //       })
  //   } catch (err) {
  //     res.status(500).send({
  //       message: `Error retrieving Tutorial with id=${id}.`
  //     })
  //   }
  // }

  // async update(req: Request, res: Response) {
  //   let tutorial: Tutorial = req.body
  //   tutorial.id = parseInt(req.params.id)

  //   try {
  //     const num = await tutorialRepository.update(tutorial)

  //     if (num == 1) {
  //       res.send({
  //         message: 'Tutorial was updated successfully.'
  //       })
  //     } else {
  //       res.send({
  //         message: `Cannot update Tutorial with id=${tutorial.id}. Maybe Tutorial was not found or req.body is empty!`
  //       })
  //     }
  //   } catch (err) {
  //     res.status(500).send({
  //       message: `Error updating Tutorial with id=${tutorial.id}.`
  //     })
  //   }
  // }

  // async delete(req: Request, res: Response) {
  //   const id: number = parseInt(req.params.id)

  //   try {
  //     const num = await tutorialRepository.delete(id)

  //     if (num == 1) {
  //       res.send({
  //         message: 'Tutorial was deleted successfully!'
  //       })
  //     } else {
  //       res.send({
  //         message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
  //       })
  //     }
  //   } catch (err) {
  //     res.status(500).send({
  //       message: `Could not delete Tutorial with id==${id}.`
  //     })
  //   }
  // }

  // async deleteAll(req: Request, res: Response) {
  //   try {
  //     const num = await tutorialRepository.deleteAll()

  //     res.send({ message: `${num} Tutorials were deleted successfully!` })
  //   } catch (err) {
  //     res.status(500).send({
  //       message: 'Some error occurred while removing all tutorials.'
  //     })
  //   }
  // }

  // async findAllPublished(req: Request, res: Response) {
  //   try {
  //     const tutorials = await tutorialRepository.retrieveAll({ published: true })

  //     res.status(200).send(tutorials)
  //   } catch (err) {
  //     res.status(500).send({
  //       message: 'Some error occurred while retrieving tutorials.'
  //     })
  //   }
  // }
}
