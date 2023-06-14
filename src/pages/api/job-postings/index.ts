import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { jobPostingValidationSchema } from 'validationSchema/job-postings';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getJobPostings();
    case 'POST':
      return createJobPosting();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getJobPostings() {
    const data = await prisma.job_posting
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'job_posting'));
    return res.status(200).json(data);
  }

  async function createJobPosting() {
    await jobPostingValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.application?.length > 0) {
      const create_application = body.application;
      body.application = {
        create: create_application,
      };
    } else {
      delete body.application;
    }
    const data = await prisma.job_posting.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
