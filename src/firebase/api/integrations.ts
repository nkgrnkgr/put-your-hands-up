import { IntegrationsModel } from '../../models/Integrations';
import { db } from '../index';

const COLLECTION_KEY = 'integrations';
const COLLECTION = db.collection(COLLECTION_KEY);

export const getIntegrations = async (id: string) => {
  const doc = await COLLECTION.doc(id).get();

  return doc.data() as IntegrationsModel;
};

export const addOrUpdateIntegrations = (integrations: IntegrationsModel) => {
  COLLECTION.doc(integrations.id).set(integrations);
};
